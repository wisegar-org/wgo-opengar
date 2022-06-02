import { ApiService } from "../../core/services/ApiService";
import { M_LOGIN, Q_ME } from "./AuthServiceQueries";
import "../models";
import { IAuthLoginParams, IAuthMeParams, ISuccesLogin } from "../models";
import { IUser } from "../../core/models/user";

export class AuthService {
  private apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async loginUser(input: IAuthLoginParams): Promise<ISuccesLogin | undefined> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_LOGIN,
        variables: {
          data: input,
        },
      })) as {
        data: { login: ISuccesLogin };
      };
      if (response && response.data) {
        const {
          data: { login },
        } = response;
        return login;
      }

      return undefined;
    } catch (error) {
      console.log("AuthService loginUser error: ", error);
      return undefined;
    }
  }

  async me(input: IAuthMeParams): Promise<IUser | undefined> {
    try {
      const response = (await this.apiInstance.query({
        query: Q_ME,
        variables: {
          data: input,
        },
      })) as {
        data: { me: IUser };
      };
      if (response && response.data) {
        const {
          data: { me },
        } = response;
        return me;
      }

      return undefined;
    } catch (error) {
      console.log("AuthService me error: ", error);
      return undefined;
    }
  }
}
