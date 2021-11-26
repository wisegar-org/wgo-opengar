import gql from 'graphql-tag';

export const Q_STORAGE_ALLITEMS = gql`
  query getStorageByType($data: StorageAllInputGQL!) {
    getStorageByType(data: $data) {
      id
      type
      content
      image {
        id
        mimetype
        isPublic
        displayName
        fileName
        url
      }
      imageList {
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

export const Q_STORAGE_ITEMSBYPAGE = gql`
  query getStorageByPagination($data: StoragePageInputGQL!) {
    getStorageByPagination(data: $data) {
      storageItemsCount
      storageItems {
        id
        type
        content
        image {
          id
          mimetype
          isPublic
          displayName
          fileName
          url
        }
        imageList {
          id
          mimetype
          isPublic
          displayName
          fileName
          url
        }
      }
    }
  }
`;

export const M_STORAGE_CREATEITEM = gql`
  mutation createStorageItem($data: StorageInputGQL!) {
    createStorageItem(data: $data)
  }
`;

export const M_STORAGE_MODIFYITEM = gql`
  mutation updateStorageItem($data: StorageInputGQL!) {
    updateStorageItem(data: $data)
  }
`;

export const M_STORAGE_DELETEITEM = gql`
  mutation deleteStorageItem($id: Float!) {
    deleteStorageItem(id: $id)
  }
`;
