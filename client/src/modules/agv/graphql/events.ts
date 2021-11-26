import gql from 'graphql-tag';

export const M_AGV_CREATE_EVENTS = gql`
  mutation agvCreateEvent($data: AGVEventInput!) {
    agvCreateEvent(data: $data)
  }
`;

export const M_AGV_MODIFY_EVENTS = gql`
  mutation agvModifyEvent($data: AGVEventInput!) {
    agvModifyEvent(data: $data)
  }
`;

export const Q_AGV_ALL_EVENTS = gql`
  query agvAllEvents($urlApi: String!) {
    agvAllEvents(urlApi: $urlApi) {
      id
      title
      description
      shortDescription
      class
      type
      state
      startDate
      endDate
      visible
      enrollment
      inscriptions
      imgTitle {
        id
        url
      }
      imgList {
        id
        url
      }
    }
  }
`;
