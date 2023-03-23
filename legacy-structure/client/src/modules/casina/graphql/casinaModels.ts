import gql from 'graphql-tag';

export const Q_CASINA_ADMIN_LOADINDEXCONTENT = gql`
  query getCasinaIndexContent($urlApi: String!) {
    getCasinaIndexContent(urlApi: $urlApi) {
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

export const M_CASINA_ADMIN_SETINDEXCONTENT = gql`
  mutation setCasinaIndexContent($data: CasinaIndexContentInputsGQL!) {
    setCasinaIndexContent(data: $data)
  }
`;

//RICK pon las tuyas debajo de este comentario
