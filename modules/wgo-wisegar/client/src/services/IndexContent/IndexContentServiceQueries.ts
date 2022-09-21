import gql from "graphql-tag";

export const Q_WISEGAR_LOAD_INDEXCONTENT = gql`
  query getIndexContent($urlApi: String!) {
    getIndexContent(urlApi: $urlApi) {
      image {
        id
        mimetype
        isPublic
        displayName
        fileName
        url
      }
    }
  }
`;

export const M_WISEGAR_SET_INDEXCONTENT = gql`
  mutation setIndexContent($data: IndexContentInputs!) {
    setIndexContent(data: $data)
  }
`;
