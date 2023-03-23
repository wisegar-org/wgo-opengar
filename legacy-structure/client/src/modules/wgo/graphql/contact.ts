import gql from 'graphql-tag';

export const Q_CONTACT_DATA = gql`
  query getWGOContactData($module: String!) {
    getWGOContactData(module: $module) {
      module,
      contactName,
      address,
      email,
      phoneNumber,
      mapPath,
    }
  }
`;

export const M_CONTACT_DATA = gql`
  mutation setWGOContactData($data: WGOContactInputGQL!) {
    setWGOContactData(data: $data)
  }
`;
