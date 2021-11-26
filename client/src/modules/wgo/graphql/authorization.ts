import gql from 'graphql-tag';

export const M_LOGIN = gql`
  mutation login($data: LoginModelInputGQL!) {
    login(data: $data) {
      isSuccess
      result {
        token
        user {
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
      }
      message
      error
    }
  }
`;

export const M_REGISTER_USER = gql`
  mutation addUser($data: UserInputGQL!) {
    addUser(data: $data) {
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

export const M_UPDATE_USER = gql`
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

export const Q_GET_USER_LOGGED = gql`
  query userById($id: Float!) {
    userById(id: $id) {
      isSuccess
      result {
        id
        uuid
        email
        name
        lastName
        userName
        isEmailConfirmed
        languageId
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

export const Q_GET_SERVER_VERSION = gql`
  query {
    serverVersion
  }
`;
