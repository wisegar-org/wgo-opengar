import gql from 'graphql-tag';

export const Q_LANGUAGE_ALL = gql`
  query allLanguage($urlApi: String!) {
    allLanguage(urlApi: $urlApi) {
      id
      code
      default
      enabled
      logo {
        id
        url
        isPublic
      }
    }
  }
`;

export const M_LANGUAGE_CREATE = gql`
  mutation createLanguage($data: LanguageInputGQL!) {
    createLanguage(data: $data)
  }
`;

export const M_LANGUAGE_MODIFY = gql`
  mutation modifyLanguage($data: LanguageInputGQL!) {
    modifyLanguage(data: $data)
  }
`;

export const Q_TRANSLATION_GETFILTERTRANSLATIONS = gql`
  query getTranslationByFilter($data: TranslationFilterInputGQL!) {
    getTranslationByFilter(data: $data) {
      translationsCount
      translations {
        id
        key
        value
      }
    }
  }
`;

export const Q_TRANSLATION_GETTRANSLATION = gql`
  query getTranslation($data: GetTranslationInputGQL!) {
    getTranslation(data: $data)
  }
`;

export const M_TRANSLATION_SETTRANSLATION = gql`
  mutation setTranslation($data: TranslationInputGQL!) {
    setTranslation(data: $data)
  }
`;

export const Q_TRANSLATION_EXPORTTRANSLATIONS = gql`
  query exportTranslations {
    exportTranslations {
      isSuccess
      data
    }
  }
`;

export const M_TRANSLATION_IMPORTTRANSLATIONS = gql`
  mutation importTranslations($data: ImportTranslationsInputGQL!) {
    importTranslations(data: $data)
  }
`;

export const Q_TRANSLATION_GETLISTTRANSLATIONS = gql`
  query getTranslationsContent($data: GetListTranslationsInputGQL!) {
    getTranslationsContent(data: $data) {
      items {
        key
        value
      }
    }
  }
`;
