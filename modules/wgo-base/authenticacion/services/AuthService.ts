import { ApiService } from "../../core/services/ApiService";
import {
  M_AUTH_CHANGE_PASSWORD,
  M_AUTH_CONFIRM_REGISTER,
  M_AUTH_EDIT_USER,
  M_AUTH_LOGIN,
  M_AUTH_REGISTER,
  M_AUTH_RESEND_CONFIRM,
  M_AUTH_RESET_PASSWORD,
  Q_AUTH_ME,
} from "./AuthServiceQueries";
import "../models";
import {
  IAuthEditParams,
  IAuthLoginParams,
  IAuthMeParams,
  IAuthRegisterParams,
  IAuthResendParam,
  IChangePasswordParam,
  ISuccesLogin,
} from "../models";
import { IUser } from "../../core/models/user";

export class AuthService {
  private apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async loginUser(input: IAuthLoginParams): Promise<ISuccesLogin | undefined> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AUTH_LOGIN,
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
        query: Q_AUTH_ME,
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

  async registerUser(input: IAuthRegisterParams): Promise<IUser | undefined> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AUTH_REGISTER,
        variables: {
          data: input,
        },
      })) as {
        data: { register: IUser };
      };
      if (response && response.data) {
        const {
          data: { register },
        } = response;
        return register;
      }

      return undefined;
    } catch (error) {
      console.log("AuthService register error: ", error);
      return undefined;
    }
  }

  async editUser(input: IAuthEditParams): Promise<IUser | undefined> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AUTH_EDIT_USER,
        variables: {
          data: input,
        },
      })) as {
        data: { editUser: IUser };
      };
      if (response && response.data) {
        const {
          data: { editUser },
        } = response;
        return editUser;
      }

      return undefined;
    } catch (error) {
      console.log("AuthService editUser error: ", error);
      return undefined;
    }
  }

  async resetPassword(input: IAuthResendParam): Promise<boolean> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AUTH_RESET_PASSWORD,
        variables: {
          data: input,
        },
      })) as {
        data: { resetPassword: boolean };
      };
      if (response && response.data) {
        const {
          data: { resetPassword },
        } = response;
        return resetPassword;
      }

      return false;
    } catch (error) {
      console.log("AuthService resetPassword error: ", error);
      return false;
    }
  }

  async changeResetPassword(input: IChangePasswordParam): Promise<boolean> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AUTH_CHANGE_PASSWORD,
        variables: {
          data: input,
        },
      })) as {
        data: { changeResetPassword: boolean };
      };
      if (response && response.data) {
        const {
          data: { changeResetPassword },
        } = response;
        return changeResetPassword;
      }

      return false;
    } catch (error) {
      console.log("AuthService changeResetPassword error: ", error);
      return false;
    }
  }

  async resendConfirmation(input: IAuthResendParam): Promise<boolean> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AUTH_RESEND_CONFIRM,
        variables: {
          data: input,
        },
      })) as {
        data: { resendConfirmation: boolean };
      };
      if (response && response.data) {
        const {
          data: { resendConfirmation },
        } = response;
        return resendConfirmation;
      }

      return false;
    } catch (error) {
      console.log("AuthService resendConfirmation error: ", error);
      return false;
    }
  }
  async confirmEmail(input: IAuthMeParams): Promise<boolean> {
    try {
      const response = (await this.apiInstance.mutate({
        mutation: M_AUTH_CONFIRM_REGISTER,
        variables: {
          data: input,
        },
      })) as {
        data: { confirmRegist: boolean };
      };
      if (response && response.data) {
        const {
          data: { confirmRegist },
        } = response;
        return confirmRegist;
      }

      return false;
    } catch (error) {
      console.log("AuthService confirmRegist error: ", error);
      return false;
    }
  }
}
