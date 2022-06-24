import gql from "graphql-tag";

export const M_AUTH_LOGIN = gql`
  mutation login($data: LoginInput!) {
    login(data: $data) {
      user {
        id
        name
        lastName
        userName
        email
        roles
      }
      token
    }
  }
`;
export const Q_AUTH_ME = gql`
  query me($data: MeInput!) {
    me(data: $data) {
      id
      name
      lastName
      userName
      email
      roles
    }
  }
`;

export const M_AUTH_REGISTER = gql`
  mutation register($data: RegisterInput!) {
    register(data: $data) {
      id
      name
      lastName
      userName
      email
      roles
    }
  }
`;
export const M_AUTH_EDIT_USER = gql`
  mutation editUser($data: EditUserInput!) {
    editUser(data: $data) {
      id
      name
      lastName
      userName
      email
      roles
    }
  }
`;
export const M_AUTH_RESEND_CONFIRM = gql`
  mutation resendConfirmation($data: ResendConfirmationInput!) {
    resendConfirmation(data: $data)
  }
`;

export const M_AUTH_CONFIRM_REGISTER = gql`
  mutation confirmRegist($data: MeInput!) {
    confirmRegist(data: $data)
  }
`;

export const M_AUTH_RESET_PASSWORD = gql`
  mutation resetPassword($data: ResendConfirmationInput!) {
    resetPassword(data: $data)
  }
`;

export const M_AUTH_CHANGE_PASSWORD = gql`
  mutation changeResetPassword($data: ResetPasswordInput!) {
    changeResetPassword(data: $data)
  }
`;
