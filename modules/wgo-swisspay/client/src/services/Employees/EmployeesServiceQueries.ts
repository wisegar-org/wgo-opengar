import gql from 'graphql-tag';

export const Q_EMPLOYEES_GETALL = gql`
  query getAllEmployees($data: EmployeesFilterInput!) {
    getAllEmployees(data: $data) {
      id
      name
      email
      enterprise {
        id
        name
        lastName
        userName
        email
        roles
        code
        certificate
      }
      client {
        id
        name
        lastName
        userName
        email
        roles
        code
        certificate
      }
    }
  }
`;

export const Q_EMPLOYEES_GETALL_EMAILS = gql`
  query getAllEmailEmployees($data: UserFilterInput!) {
    getAllEmailEmployees(data: $data)
  }
`;

export const M_EMPLOYEES_REGISTER = gql`
  mutation sendEmployeeAddLink($data: EmployeesRegisterInput!) {
    sendEmployeeAddLink(data: $data)
  }
`;

export const M_EMPLOYEES_ADD = gql`
  mutation addEmployee($data: EmployeesInput!) {
    addEmployee(data: $data)
  }
`;

export const M_EMPLOYEES_CHECK_TOKEN = gql`
  mutation checkEmployeeToken($data: EmployeesTokenInput!) {
    checkEmployeeToken(data: $data) {
      user_id
      enterprise_id
      enterprise_name
    }
  }
`;

export const M_EMPLOYEES_DELETE = gql`
  mutation deleteEmployee($data: UserFilterInput!) {
    deleteEmployee(data: $data)
  }
`;

export const M_EMPLOYEES_SEND_DOCUMENTS = gql`
  mutation sendEmployeeDocuments($data: EmployeeSendDocumentsInput!) {
    sendEmployeeDocuments(data: $data)
  }
`;

export const Q_EMPLOYEES_IMPORT_FROM_FILES = gql`
  query getEmployeesByFiles($data: GetEmployeesByFileInput!) {
    getEmployeesByFiles(data: $data) {
      name
      lastName
      email
      code
    }
  }
`;

export const M_EMPLOYEES_IMPORT_LIST = gql`
  mutation importEmployeeList($data: ImportEmployeesInput!) {
    importEmployeeList(data: $data) {
      id
      name
      email
      enterprise {
        id
        name
        lastName
        userName
        email
        roles
        code
        certificate
      }
      client {
        id
        name
        lastName
        userName
        email
        roles
        code
        certificate
      }
      confirmed
    }
  }
`;
