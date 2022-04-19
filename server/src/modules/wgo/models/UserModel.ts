import { UserInputGQL } from '../modules';
import { ErrorResponse, Response } from '../models/responseModels/Response';
import {
  AccessTokenData,
  generateAccessToken,
  LanguageService,
  TranslationService,
  UserDataService,
  UserEntity,
  validateAccessToken,
} from '@wisegar-org/wgo-opengar-core';
import { GetEmailSenderKey, GetEmailSenderNameKey } from '@wisegar-org/wgo-settings';
import { HandlebarsTemplateService } from '@wisegar-org/wgo-templating';
import { Connection } from 'typeorm';
import _ from 'lodash';
import { EmailModel } from './EmailModel';

const EmailVerificationKeys = {
  subject: {
    key: 'WGO_AUTH_CONFIRM_EMAIL_SUBJECT',
    trim: true,
    default: 'Email Confirmation',
  },
  body: {
    key: 'WGO_AUTH_CONFIRM_EMAIL_BODY',
    trim: false,
    default: `<h2>Confirm Email</h2><p>{{link}}</p>`,
  },
};

export class UserModel {
  private readonly _userDataService: UserDataService;
  private readonly _emailModel: EmailModel;
  private readonly _languageService: LanguageService;
  private readonly _translationService: TranslationService;
  private readonly _handlebarsService: HandlebarsTemplateService;
  /**
   *
   */
  constructor(conn: Connection) {
    this._userDataService = new UserDataService(conn);
    this._emailModel = new EmailModel();
    this._translationService = new TranslationService(conn);
    this._languageService = new LanguageService(conn);
    this._handlebarsService = new HandlebarsTemplateService();
  }

  async addUser(userInput: UserInputGQL, urlApi: string): Promise<Response<UserEntity>> {
    const { name, lastName, email, userName, password, roles, isEmailConfirmed } = userInput;
    const user = new UserEntity();
    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.userName = userName;
    user.password = password;
    user.isEmailConfirmed = isEmailConfirmed;
    const getEmailOptions = await this.getEmailTokenVerificationFn(user, urlApi);
    const registerResponse = await this._userDataService.create(user, [], getEmailOptions);
    if (registerResponse.isSuccess) {
      const uuid = registerResponse.result.uuid;
      const result = await this._userDataService.setUserRoles(uuid, roles);
      if (result.isSuccess) {
        return registerResponse;
      }
      return ErrorResponse.Response('Error adding roles to user but user was created');
    }
    return ErrorResponse.Response('Error creating user');
  }

  async updateUser(userInput: UserInputGQL): Promise<Response<UserEntity>> {
    const { id, name, lastName, email, userName, roles, password, isEmailConfirmed } = userInput;
    const userResponse = await this._userDataService.oneById(id);
    if (!userResponse.isSuccess) {
      return ErrorResponse.Response(`Error trying to update user.User not found with id:${id}`);
    }
    const user = userResponse.result;
    user.name = name ? name : user.name;
    user.lastName = lastName ? lastName : user.lastName;
    user.email = email ? email : user.email;
    user.userName = userName ? userName : user.userName;
    user.isEmailConfirmed = isEmailConfirmed != null ? isEmailConfirmed : user.isEmailConfirmed;
    let updateResp = await this._userDataService.update(user);

    if (updateResp.isSuccess && password) {
      updateResp = await this._userDataService.updatePassword(user.uuid, password);
    }

    if (!updateResp.isSuccess) {
      return ErrorResponse.Response(`Error trying to update user.`);
    }

    if (_.isUndefined(roles) || !_.isArray<number>(roles)) {
      return updateResp;
    }
    return await this._userDataService.setUserRoles(user.uuid, roles);
  }

  async confirmUser(token: string) {
    const result = validateAccessToken(token);
    if (result && !result.expiring) {
      const user = await this._userDataService.oneById(result.userId);
      if (user.result.confirmationToken === token) {
        user.result.isEmailConfirmed = true;
        user.result.confirmationToken = '';
        return !!(await this._userDataService.update(user.result));
      }
    }
    return false;
  }

  async resendConfirmationUser(email: string, urlApi: string) {
    const user = await this._userDataService.one({
      email: email,
    });
    if (!!user && user.isSuccess) {
      const token = generateAccessToken(<AccessTokenData>{
        userId: user.result.id,
      });
      user.result.confirmationToken = token;
      await this._userDataService.update(user.result);
      const getEmailOption = await this.getEmailTokenVerificationFn(user.result, urlApi);
      const result = await this._emailModel.sendEmail(getEmailOption(token));
      return result.isSuccess;
    }
    return false;
  }

  async getEmailTokenVerificationFn(user: UserEntity, urlApi: string) {
    const landDefault = await this._languageService.languageRepository.findOne({
      default: true,
    });
    const lanId = user.languageId || landDefault.id;
    const subject = await this._translationService.getTranslation(
      lanId,
      EmailVerificationKeys.subject.key,
      EmailVerificationKeys.subject.trim
    );
    let body = await this._translationService.getTranslation(
      lanId,
      EmailVerificationKeys.body.key,
      EmailVerificationKeys.body.trim
    );
    return (token) => {
      const html = this._handlebarsService.getTemplateData(body, {
        user: user,
        link: `${urlApi}/#/opengar/auth/checkEmailConfirmation/${token}`,
      });
      return {
        from: `<${GetEmailSenderKey()}> ${GetEmailSenderNameKey()}`,
        to: user.email,
        subject: subject,
        html: html,
      };
    };
  }

  async registerKeys() {
    const langs = await this._languageService.all();
    const transConfig = Object.values(EmailVerificationKeys);
    for (const lan of langs) {
      if (lan.enabled) {
        for (const config of transConfig) {
          const translation = await this._translationService.getTranslation(lan.id, config.key, config.trim);
          if (translation === config.key) {
            await this._translationService.setTranslation(lan.id, config.key, config.default);
          }
        }
      }
    }
  }
}
