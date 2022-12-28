import { ApiService } from "@wisegar-org/wgo-base-client/build/core/services/ApiService";
import { ICollaboratorOption, IOptionFilter } from "src/models/financeOptions";
import {
  Q_WISEGAR_FINANCE_LOAD_ASSIGNED_TO_OPTIONS,
  Q_WISEGAR_FINANCE_LOAD_LABELS_OPTIONS,
  Q_WISEGAR_FINANCE_LOAD_PROJECT_OPTIONS,
  Q_WISEGAR_FINANCE_LOAD_REPOSITORY_OPTIONS,
} from "./IssuesOptionsServiceQueries";

export class IssuesOptionsService {
  apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }

  async loadLabelsOptions() {
    try {
      const response = (await this.apiInstance.query({
        query: Q_WISEGAR_FINANCE_LOAD_LABELS_OPTIONS,
        variables: {},
        fetchPolicy: "no-cache",
      })) as { data: { getFinanceIssuesLabelOptions: IOptionFilter[] } };
      if (response && response.data && response.data) {
        const {
          data: { getFinanceIssuesLabelOptions },
        } = response;

        return getFinanceIssuesLabelOptions;
      }
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async loadRepositoryOptions() {
    try {
      const response = (await this.apiInstance.query({
        query: Q_WISEGAR_FINANCE_LOAD_REPOSITORY_OPTIONS,
        variables: {},
        fetchPolicy: "no-cache",
      })) as { data: { getFinanceIssuesRepositoryOptions: IOptionFilter[] } };
      if (response && response.data && response.data) {
        const {
          data: { getFinanceIssuesRepositoryOptions },
        } = response;

        return getFinanceIssuesRepositoryOptions;
      }
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async loadProjectOptions() {
    try {
      const response = (await this.apiInstance.query({
        query: Q_WISEGAR_FINANCE_LOAD_PROJECT_OPTIONS,
        variables: {},
        fetchPolicy: "no-cache",
      })) as { data: { getFinanceIssuesProjectOptions: IOptionFilter[] } };
      if (response && response.data && response.data) {
        const {
          data: { getFinanceIssuesProjectOptions },
        } = response;

        return getFinanceIssuesProjectOptions;
      }
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async loadAssignedToOptions() {
    try {
      const response = (await this.apiInstance.query({
        query: Q_WISEGAR_FINANCE_LOAD_ASSIGNED_TO_OPTIONS,
        variables: {},
        fetchPolicy: "no-cache",
      })) as {
        data: { getFinanceIssuesAssignedToOptions: ICollaboratorOption[] };
      };
      if (response && response.data && response.data) {
        const {
          data: { getFinanceIssuesAssignedToOptions },
        } = response;

        return getFinanceIssuesAssignedToOptions;
      }
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
