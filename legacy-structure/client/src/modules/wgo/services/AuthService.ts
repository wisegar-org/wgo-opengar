// import { ApiSettings } from '../settings/ApiSettings';
import {
  LoginModelInputGql,
  UserInputGql,
  UserLoginResponseGql,
  UserResponseGql
} from 'src/graphql';
import { ApiService } from '@wisegar-org/wgo-opengar-core-ui';
import {
  M_LOGIN,
  Q_GET_USER_LOGGED,
  M_REGISTER_USER,
  M_UPDATE_USER,
  Q_GET_SERVER_VERSION
} from '../graphql/authorization';
import { IVersionResult } from '../models';

export class AuthService {
  apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async loginUser(config: LoginModelInputGql): Promise<UserLoginResponseGql> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_LOGIN,
        variables: {
          data: {
            userName: config.userName,
            password: config.password
          }
        }
      })) as {
        data: { login: UserLoginResponseGql };
      };
      if (response && response.data) {
        const {
          data: { login }
        } = response;
        return login;
      } else
        return <UserLoginResponseGql>{
          isSuccess: false,
          message: 'Incorrect user or password'
        };
    } catch (error) {
      return <UserLoginResponseGql>{
        isSuccess: false,
        message: 'Network error. Server is unreachable'
      };
    }
  }
  async getUserLoggedById(id: number): Promise<UserResponseGql> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_GET_USER_LOGGED,
        fetchPolicy: 'no-cache',
        variables: {
          id: id
        }
      })) as {
        data: { userById: UserResponseGql };
      };

      if (response && response.data) {
        const {
          data: { userById }
        } = response;
        return userById;
      } else return <UserResponseGql>{ isSuccess: false };
    } catch (error) {
      throw `AuthService getUserLoggedById: ${error as string}`;
    }
  }
  async registerUser(config: UserInputGql): Promise<UserResponseGql> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_REGISTER_USER,
        variables: {
          data: config,
          urlApi: process.env.API_BASE
        }
      })) as {
        data: { addUser: UserResponseGql };
      };

      if (response && response.data) {
        const {
          data: { addUser }
        } = response;

        return addUser;
      } else return <UserResponseGql>{ isSuccess: false };
    } catch (error) {
      throw `AuthService registerUser: ${error as string}`;
    }
  }
  async updateUser(config: UserInputGql): Promise<UserResponseGql> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_UPDATE_USER,
        variables: {
          data: config
        }
      })) as { data: { updateUser: UserResponseGql } };

      if (response && response.data) {
        const {
          data: { updateUser }
        } = response;

        return updateUser;
      } else return <UserResponseGql>{ isSuccess: false };
    } catch (error) {
      throw `AuthService updateUser: ${error as string}`;
    }
  }
  async getServerVersion(): Promise<IVersionResult> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_GET_SERVER_VERSION,
        fetchPolicy: 'no-cache'
      })) as { data: { serverVersion: string } };
      if (response && response.data) {
        const {
          data: { serverVersion }
        } = response;

        return <IVersionResult>{
          isSuccess: true,
          version: serverVersion
        };
      } else
        return <IVersionResult>{
          isSuccess: false,
          version: 'unknown'
        };
    } catch (error) {
      return <IVersionResult>{
        isSuccess: false,
        message: 'Network error, fail to load server version.'
      };
    }
  }
}
