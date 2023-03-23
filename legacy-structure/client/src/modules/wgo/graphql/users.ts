import gql from 'graphql-tag';

export const Q_ALL_ROLES = gql`
  query {
    roles {
      isSuccess
      result {
        id
        name
      }
      message
      error
    }
  }
`;

export const Q_ALL_USERS = gql`
  query {
    users {
      isSuccess
      result {
        id
        uuid
        email
        name
        lastName
        userName
        isEmailConfirmed
        roles {
          id
          name
        }
      }
      message
      error
    }
  }
`;

export const Q_REGISTER_USER = gql`
  mutation addUser($data: UserInputGQL!, $urlApi: String!) {
    addUser(data: $data, urlApi: $urlApi) {
      isSuccess
      result {
        id
        uuid
        email
        name
        lastName
        userName
        isEmailConfirmed
        roles {
          id
          name
        }
      }
      message
      error
    }
  }
`;

export const Q_UPDATE_USER = gql`
  mutation updateUser($data: UserInputGQL!) {
    updateUser(data: $data) {
      isSuccess
      result {
        id
        uuid
        email
        name
        lastName
        userName
        isEmailConfirmed
        roles {
          id
          name
        }
      }
      message
      error
    }
  }
`;

export const Q_DELETE_USER = gql`
  mutation deleteUser($uuid: String!) {
    removeUser(uuid: $uuid) {
      isSuccess
      result {
        __typename
      }
      message
      error
    }
  }
`;

export const M_USER_SETUSERLANGUAGE = gql`
  mutation setUserLanguage($uuid: String!, $langId: Float!) {
    setUserLanguage(uuid: $uuid, langId: $langId)
  }
`;

export const M_USER_CONFIRMUSER = gql`
  mutation confirmUser($token: String!) {
    confirmUser(token: $token)
  }
`;

export const M_USER_SENDEMAILCONFIRMATION = gql`
  mutation resendConfirmationUser($email: String!, $urlApi: String!) {
    resendConfirmationUser(email: $email, urlApi: $urlApi)
  }
`;
