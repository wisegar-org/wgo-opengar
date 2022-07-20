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

export const M_EMPLOYEES_REGISTER = gql`
  mutation registerEmployee($data: EmployeesRegisterInput!) {
    registerEmployee(data: $data)
  }
`;
