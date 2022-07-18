import gql from 'graphql-tag';

export const Q_EMPLOYEES_GETALL = gql`
  query getAllEmployees($data: EmployeesFilterInput!) {
    getAllEmployees(data: $data) {
      id
      name
      email
      enterprise_id {
        id
        name
        email
      }
      client_id {
        id
        name
        email
      }
    }
  }
`;
