import gql from "graphql-tag";

export const Q_TRANSLATION_GETALL = gql`
  query ($data: GetAllTranslationInput!) {
    getAllTranslations(data: $data) {
      id
      key
      value
      languageId
    }
  }
`;

export const Q_TRANSLATION_GETALLBYKEYS = gql`
  query ($data: GetTranslationByKeysInput!) {
    getAllTranslationsByKeys(data: $data) {
      id
      key
      value
      languageId
    }
  }
`;

export const M_TRANSLATION_SETTRANSLATION = gql`
  mutation ($data: SetTranslationInput!) {
    setTranslation(data: $data) {
      id
      key
      value
      languageId
    }
  }
`;
