import gql from 'graphql-tag';

export const Q_FINANCE_ADMIN_LOADINDEXCONTENT = gql`
  query getFinanceIndexContent($urlApi: String!) {
    getFinanceIndexContent(urlApi: $urlApi) {
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

export const M_FINANCE_ADMIN_SETINDEXCONTENT = gql`
  mutation setFinanceIndexContent($data: FinanceIndexContentInputsGQL!) {
    setFinanceIndexContent(data: $data)
  }
`;