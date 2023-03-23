import gql from 'graphql-tag';

export const M_AGV_CREATE_INSCRIPTION = gql`
  mutation agvCreateEvent($data: AGVInscriptionInput!) {
    agvCreateInscription(data: $data)
  }
`;

export const Q_AGV_ALL_INSCRIPTIONS = gql`
  query agvAllInscriptions {
    agvAllInscriptions {
      id
      nome
      cognome
      email
      phone
      message
      class
      eventId
      eventTitle
      eventClass
      date
    }
  }
`;
