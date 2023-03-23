import { RolModel } from './../models/models';
// import { ApiSettings } from '../settings/ApiSettings';
import { ApiService } from '@wisegar-org/wgo-opengar-core-ui';
import {
  Q_ALL_USERS,
  Q_REGISTER_USER,
  Q_UPDATE_USER,
  Q_DELETE_USER,
  Q_ALL_ROLES,
  M_USER_SETUSERLANGUAGE,
  M_USER_CONFIRMUSER,
  M_USER_SENDEMAILCONFIRMATION
} from '../graphql/users';
import {
  UsersModel,
  UsersResponseModel,
  RolesResponseModel
} from '../models/models';

export class UsersService {
  apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async getAllUsers(): Promise<UsersModel[]> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_ALL_USERS,
        variables: {},
        fetchPolicy: 'no-cache'
      })) as {
        data: { users: UsersResponseModel };
      };
      if (response && response.data) {
        return response.data.users.result;
      } else return [];
    } catch (error) {
      //
      console.log(error);
      return [];
    }
  }

  async getAllRoles(): Promise<RolModel[]> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_ALL_ROLES,
        variables: {},
        fetchPolicy: 'no-cache'
      })) as {
        data: { roles: RolesResponseModel };
      };
      if (response && response.data) {
        return response.data.roles.result;
      } else return [];
    } catch (error) {
      //
      console.log(error);
      return [];
    }
  }

  async createUser(user: UsersModel): Promise<boolean> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: Q_REGISTER_USER,
        variables: {
          data: {
            id: 0,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            userName: user.userName,
            roles: user.roles,
            isEmailConfirmed: user.isEmailConfirmed,
            password: user.password
          },
          urlApi: location.origin
        }
      })) as { data: { addUser: { isSuccess: boolean } } };
      if (response && response.data && response.data) {
        const isSuccess = response.data.addUser.isSuccess;
        return !!isSuccess;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updateUser(user: UsersModel): Promise<boolean> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: Q_UPDATE_USER,
        variables: {
          data: user
        }
      })) as { data: { userUpdated: boolean } };

      if (response && response.data) {
        const {
          data: { userUpdated }
        } = response;

        return userUpdated;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteUser(user: UsersModel): Promise<boolean> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: Q_DELETE_USER,
        variables: {
          uuid: user.uuid
        }
      })) as { data: { removeUser: { isSuccess: boolean } } };
      if (response && response.data) return response.data.removeUser.isSuccess;
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async setUserLanguage(uuid: string, langId: number): Promise<boolean> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_USER_SETUSERLANGUAGE,
        variables: {
          uuid,
          langId
        },
        fetchPolicy: 'no-cache'
      })) as { data: { setUserLanguage: boolean } };

      if (response && response.data && response.data) {
        const {
          data: { setUserLanguage }
        } = response;

        return setUserLanguage;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async confirmEmail(token: string): Promise<boolean> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_USER_CONFIRMUSER,
        variables: {
          token
        },
        fetchPolicy: 'no-cache'
      })) as { data: { confirmUser: boolean } };

      if (response && response.data && response.data) {
        const {
          data: { confirmUser }
        } = response;

        return confirmUser;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async resendConfirmEmail(email: string): Promise<boolean> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_USER_SENDEMAILCONFIRMATION,
        variables: {
          email: email,
          urlApi: location.origin
        },
        fetchPolicy: 'no-cache'
      })) as { data: { resendConfirmationUser: boolean } };

      if (response && response.data && response.data) {
        const {
          data: { resendConfirmationUser }
        } = response;

        return resendConfirmationUser;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
