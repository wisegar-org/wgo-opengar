import gql from 'graphql-tag';

export const M_MEDIA_UPLOADFILE = gql`
  mutation saveImage($data: MediaInputGQL!, $urlApi: String!) {
    saveImage(data: $data, urlApi: $urlApi) {
      id
      mimetype
      isPublic
      displayName
      fileName
      url
    }
  }
`;

export const M_MEDIA_UPLOADFAVICON = gql`
  mutation saveFaviconFile($data: MediaInputGQL!, $urlApi: String!) {
    saveFaviconFile(data: $data, urlApi: $urlApi) {
      id
      mimetype
      isPublic
      displayName
      fileName
      url
    }
  }
`;

export const M_MEDIA_UPLOADFILES = gql`
  mutation saveFiles($data: MediasInputGQL!, $urlApi: String!) {
    saveFiles(data: $data, urlApi: $urlApi) {
      id
      mimetype
      isPublic
      displayName
      fileName
      url
    }
  }
`;

export const Q_MEDIA_GETFILE = gql`
  query getFile($id: Float!) {
    getFile(id: $id) {
      mimetype
      data
    }
  }
`;
