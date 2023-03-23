import gql from "graphql-tag";

export const Q_WISEGAR_FINANCE_LOAD_ISSUES_PAGE = gql`
  query getFinanceIssues($data: FinanceIssuesPageInput!) {
    getFinanceIssues(data: $data) {
      issuesCount
      issues {
        id
        owner
        repo
        title
        status
        hours
        labels
        milestones
        last_comment
        assignedToId
        assignedTo {
          login
          name
          lastName
          email
        }
        projectId
        repositoryId
        accountId
      }
    }
  }
`;
