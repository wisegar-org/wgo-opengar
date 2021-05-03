import { Request, Response } from "express";
import {
  UserEntity,
  RolEntity,
  MediaEntity,
} from "@wisegar-org/wgo-opengar-core";
import {
  UserLoginSuccessResponse,
  SuccessRequest,
  ErrorRequest,
  RolEntityEnum,
  UserRegisterErrorResponse,
  UserLoginErrorResponse,
} from "../../models/index";
import _ from "lodash";
import { ErrorResponse } from "../../models/responseModels/BasicResponse";
import { JwtService } from "@wisegar-org/wgo-opengar-core";
import { IUser } from "@wisegar-org/wgo-opengar-core";
import { privateKey, publicKey } from "../../settings";
import { EmailServer } from "../../services/EmailService";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Connection, Repository, getConnection } from "typeorm";
import { DBConector } from "../../database/DBConector";
// import { UserRepository } from "../../database/repositories/UserRepository";
// import { RoleRepository } from "../../database/repositories/RoleRepository";
// import { MediaRepository } from "../../database/repositories/MediaRepository";

// const connection: Connection = getConnection()
// const UserRepository: Repository<UserEntity> = connection.getRepository(UserEntity)
// const RolRepository: Repository<RolEntity> = connection.getRepository(RolEntity)
// const MediaRepository: Repository<MediaEntity> = connection.getRepository(MediaEntity)

////////-----------OLD CONTROLLER --------------------///////
@Service()
export class AuthController {
  connection: Connection;
  UserRepository: Repository<UserEntity>;
  RolRepository: Repository<RolEntity>;
  MediaRepository: Repository<MediaEntity>;

  constructor(conn: Connection) {
    this.connection = conn;
    this.UserRepository = this.connection.getRepository(UserEntity);
    this.RolRepository = this.connection.getRepository(RolEntity);
    this.MediaRepository = this.connection.getRepository(MediaEntity);
  }

  async loginUser(req: Request, res: Response) {
    const { user, password }: { user: string; password: string } = req.body;
    const userEntity = await this.UserRepository.findOne({
      relations: ["roles", "profileImage"],
      where: {
        userName: user,
      },
    });

    if (
      _.isEmpty(userEntity) ||
      _.isUndefined(userEntity) ||
      _.isNull(userEntity) ||
      !_.isEqual(userEntity.password, password)
    ) {
      const resp = new UserLoginErrorResponse(
        "Invalid user or invalid password"
      );
      res.send(resp);
      return;
    }

    if (!userEntity.isEmailConfirmed) {
      res.send(new UserLoginErrorResponse("User email not confirmed", true));
      return;
    }

    const JWTObj = new JwtService({
      privateKey: privateKey,
      publicKey: publicKey,
    });

    const userObj: IUser = userEntity.getJWTUser();

    const tokenResult = JWTObj.generateToken(userObj);
    if (_.isUndefined(tokenResult) || _.isEmpty(tokenResult.token)) {
      return res.send(
        new UserLoginErrorResponse(
          "Token generation error." + tokenResult.error
        )
      );
    }
    const resp = new UserLoginSuccessResponse(
      userEntity.id,
      userEntity.name,
      userEntity.lastName,
      userEntity.userName,
      userEntity.email,
      tokenResult.token,
      userEntity.profileImage?.path,
      userEntity.roles.map((rol) => rol.name)
    );
    return res.send(resp);
  }

  async checkPasswordStrength(req: Request, res: Response) {
    //TODO hacer el chequeo de la fortaleza del password
    res.send(new SuccessRequest());
  }

  async registerCustomer(req: Request, res: Response) {
    const {
      name,
      lastName,
      userName,
      email,
      password,
      profileImage,
    }: {
      name: string;
      lastName: string;
      userName: string;
      email: string;
      password: string;
      profileImage: number;
    } = req.body;

    //checking if all parameters have a value
    if (
      _.isEmpty(name) ||
      _.isEmpty(lastName) ||
      _.isEmpty(userName) ||
      _.isEmpty(email) ||
      _.isEmpty(password)
    ) {
      res.send(new ErrorResponse("At least one of the basic params is empty"));
      return;
    }

    let usersCount = await this.UserRepository.count({
      userName: userName,
    });

    //checking if user name already exist
    if (usersCount > 0) {
      res.send(
        new UserRegisterErrorResponse(
          "userName",
          "Error in register user: user name already exist"
        )
      );
      return;
    }

    usersCount = await this.UserRepository.count({
      email: email,
    });

    //checking if email already exist
    if (usersCount > 0) {
      res.send(
        new UserRegisterErrorResponse(
          "email",
          "Error in register user: email already exist"
        )
      );
      return;
    }

    const rol = await this.RolRepository.findOne({
      name: RolEntityEnum.customer,
    });

    let profileImg: MediaEntity = null;
    if (_.isEmpty(profileImage)) {
      profileImg = await this.MediaRepository.findOne({
        id: profileImage,
      });
    }
    const user = new UserEntity(
      name,
      lastName,
      userName,
      email,
      password,
      [rol],
      false,
      profileImg
    );
    await this.UserRepository.save(user);

    const JWTObj = new JwtService({
      privateKey: privateKey,
      publicKey: publicKey,
    });

    const userObj: IUser = user.getJWTUser();

    const tokenResult = JWTObj.generateToken(userObj);
    if (_.isUndefined(tokenResult) || _.isEmpty(tokenResult.token)) {
      return res.send(
        new ErrorResponse("Token generation error." + tokenResult.error)
      );
    }

    EmailServer.sendEmail({
      from: process.env.EMAIL_SENDER_ADDRESS,
      to: user.email,
      subject: "Confrim Email",
      html: `
                   <h2>ConfirmEmail</h2>
                   <p>${process.env.CLIENT_URL}/checkEmailConfirmation/${tokenResult.token}</p>
                   `,
    })
      .then(
        (ok) => {
          return res.send(ok);
        },
        (error) => {
          return res.send(error);
        }
      )
      .catch(() => {
        return res.send(
          new ErrorResponse("Error sending email after user register")
        );
      });
  }

  async checkEmailConfirmation(req: Request, res: Response) {
    const { token } = req.body;
    if (token) {
      const JWTObj = new JwtService({
        privateKey: privateKey,
        publicKey: publicKey,
      });
      const tokenResult = JWTObj.verifyToken(token);
      if (_.isUndefined(tokenResult) || !_.isEmpty(tokenResult.error)) {
        return res.send(new ErrorResponse(tokenResult.error));
      }
      const userEntity = await this.UserRepository.findOne({
        relations: ["roles", "profileImage"],
        where: {
          userName: tokenResult.username,
        },
      });

      if (
        _.isEmpty(userEntity) ||
        _.isUndefined(userEntity) ||
        _.isNull(userEntity)
      ) {
        const resp = new ErrorRequest("User not found.");
        return res.send(resp);
      }
      if (!userEntity.isEmailConfirmed) {
        userEntity.isEmailConfirmed = true;
        await this.UserRepository.save(userEntity)
          .then(
            () => {
              return res.send(new SuccessRequest());
            },
            () => {
              return res.send(
                new ErrorResponse(
                  "Error trying to update isEmailConfirmed in user entity"
                )
              );
            }
          )
          .catch(() => {
            return res.send(
              new ErrorResponse(
                "Error trying to update isEmailConfirmed in user entity"
              )
            );
          });
      } else {
        return res.send(new SuccessRequest()); //el correo ya fue confirmado antes
      }
    }
  }

  async resendEmailConfirmation(req: Request, res: Response) {
    const { email } = req.body;
    if (_.isUndefined(email) || _.isEmpty(email)) {
      return res.send(new ErrorResponse("Email is empty"));
    }

    const user = await this.UserRepository.findOne({
      where: {
        email: email,
      },
    });

    if (_.isUndefined(user) || _.isNull(user) || _.isEmpty(user)) {
      return res.send(`Not found any user with this email address ${email}`);
    }

    const JWTObj = new JwtService({
      privateKey: privateKey,
      publicKey: publicKey,
    });
    const userObj: IUser = user.getJWTUser();

    const tokenResult = JWTObj.generateToken(userObj);
    if (_.isUndefined(tokenResult) || _.isEmpty(tokenResult.token)) {
      return res.send(
        new ErrorResponse("Token generation error." + tokenResult.error)
      );
    }

    EmailServer.sendEmail({
      from: process.env.EMAIL_SENDER_ADDRESS,
      to: user.email,
      subject: "Confrim Email",
      html: `
                   <h2>ConfirmEmail</h2>
                   <p>${process.env.CLIENT_URL}/checkEmailConfirmation/${tokenResult.token}</p>
                   `,
    })
      .then(
        (ok) => {
          return res.send(ok);
        },
        (error) => {
          return res.send(error);
        }
      )
      .catch(() => {
        return res.send(
          new ErrorResponse(
            "Error sending email for resend verification account"
          )
        );
      });
  }

  async updateCustomerProfile(req: Request, res: Response) {
    const { name, lastName, password, profileImage, id } = req.body;

    console.log("inicio");

    const userEntity = await this.UserRepository.findOne({
      relations: ["roles", "profileImage"],
      where: {
        id: id,
      },
    });

    console.log("user", userEntity);

    if (
      _.isUndefined(userEntity) ||
      _.isNull(userEntity) ||
      _.isEmpty(userEntity)
    ) {
      res.send(new ErrorRequest("error, user not found"));
    }

    const image = await this.MediaRepository.findOne({
      where: {
        id: profileImage,
      },
    });

    console.log("image", image);

    userEntity.name = name ? name : userEntity.name;
    userEntity.lastName = lastName ? lastName : userEntity.lastName;
    userEntity.profileImage = image ? image : userEntity.profileImage;
    //TODO Falta codificar el password
    userEntity.password = password ? password : userEntity.password;

    await this.UserRepository.save(userEntity);

    const resp = new UserLoginSuccessResponse(
      userEntity.id,
      userEntity.name,
      userEntity.lastName,
      userEntity.userName,
      userEntity.email,
      "token",
      userEntity.profileImage?.path,
      userEntity.roles.map((rol) => rol.name)
    );
    return res.send(resp);
  }
}
