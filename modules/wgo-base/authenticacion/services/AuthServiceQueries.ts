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
