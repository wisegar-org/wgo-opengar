import gql from "graphql-tag";

export const Q_WISEGAR_FINANCE_LOAD_LABELS_OPTIONS = gql`
  query getFinanceIssuesLabelOptions {
    getFinanceIssuesLabelOptions {
      id
      title
    }
  }
`;

export const Q_WISEGAR_FINANCE_LOAD_ASSIGNED_TO_OPTIONS = gql`
  query getFinanceIssuesAssignedToOptions {
    getFinanceIssuesAssignedToOptions {
      id
      id_github
      card_number
      pay_by_hours
      login
      node_id
      type
      avatar_url
      url
      name
      location
      email
      bio
      address
      cap
      place
    }
  }
`;
export const Q_WISEGAR_FINANCE_LOAD_PROJECT_OPTIONS = gql`
  query getFinanceIssuesProjectOptions {
    getFinanceIssuesProjectOptions {
      id
      title
    }
  }
`;
export const Q_WISEGAR_FINANCE_LOAD_REPOSITORY_OPTIONS = gql`
  query getFinanceIssuesRepositoryOptions {
    getFinanceIssuesRepositoryOptions {
      id
      title
    }
  }
`;
