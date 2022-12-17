import { ApiService } from "@wisegar-org/wgo-base-client/build/core/services/ApiService";
import { ApiSettingsConfig } from "src/api/ApiOptions";
import { Q_WISEGAR_FINANCE_LOAD_ISSUES_PAGE } from "./IssuesServiceQueries";
import {
  IFinanceIssuesPageModel,
  IFinanceIssuesPageInput,
} from "../../../../../src/models/Finance";

export class IssuesService {
  apiInstance: ApiService;
  constructor() {
    this.apiInstance = ApiService.GetInstance();
  }
  async loadIssuesPage(data: IFinanceIssuesPageInput) {
    try {
      const response = (await this.apiInstance.query({
        query: Q_WISEGAR_FINANCE_LOAD_ISSUES_PAGE,
        variables: {
          data: data,
        },
        fetchPolicy: "no-cache",
      })) as { data: { getFinanceIssues: IFinanceIssuesPageModel } };
      if (response && response.data && response.data) {
        const {
          data: { getFinanceIssues },
        } = response;

        return getFinanceIssues;
      }
      return <IFinanceIssuesPageModel>{
        issuesCount: 0,
        issues: [],
      };
    } catch (error) {
      console.log(error);
      return <IFinanceIssuesPageModel>{
        issuesCount: 0,
        issues: [],
      };
    }
  }
}
