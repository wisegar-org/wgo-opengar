import gql from "graphql-tag";

export const M_LOGIN = gql`
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
export const Q_ME = gql`
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