import gql from 'graphql-tag';

export const Q_SEO_GETMETADATA = gql`
  query getSeoData($urlApi: String!) {
    getSeoData(urlApi: $urlApi) {
      module
      path
      meta {
        name
        property
        content
        type
      }
      favicon {
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

export const M_SEO_SETMETADATA = gql`
  mutation setSeoData($data: SeoInputGQL!) {
    setSeoData(data: $data)
  }
`;
