import gql from 'graphql-tag';

export const Q_CONTACT_DATA = gql`
  query getContactData {
    getContactData {
      contactName,
      address,
      email,
      phoneNumber,
      mapPath
    }
  }
`;

export const M_CONTACT_DATA = gql`
  mutation setContactData($data: ContactInputGQL!) {
    setContactData(data: $data)
  }
`;
