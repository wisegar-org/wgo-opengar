import {
  IssuesFilterResponse,
  IssuesRecord,
  IssuesResponse
} from '../models/models';
import settings, { ApiSettings } from '../settings/ApiSettings';

export const IssuesService = {
  async loadIssues() {
    try {
      const response: IssuesResponse = await settings.axios.get(
        `${ApiSettings.API_URL}issues`
      );
      if (response && response.data && response.data.issues) {
        return response.data.issues;
      } else return [];
    } catch (error) {
      // console.log(error)
      return [];
    }
  },
  async loadMilestones() {
    try {
      const response: IssuesFilterResponse = await settings.axios.get(
        `${ApiSettings.API_URL}milestones`
      );
      if (response && response.data && response.data.milestones) {
        return response.data.milestones;
      } else return [];
    } catch (error) {
      // console.log(error)
      return [];
    }
  },
  async loadLabels() {
    try {
      const response: IssuesFilterResponse = await settings.axios.get(
        `${ApiSettings.API_URL}labels`
      );
      if (response && response.data && response.data.labels) {
        return response.data.labels;
      } else return [];
    } catch (error) {
      // console.log(error)
      return [];
    }
  },
  async loadProjects() {
    try {
      const response: IssuesFilterResponse = await settings.axios.get(
        `${ApiSettings.API_URL}projects`
      );
      if (response && response.data && response.data.projects) {
        return response.data.projects;
      } else return [];
    } catch (error) {
      // console.log(error)
      return [];
    }
  },
  async loadRepositories() {
    try {
      const response: IssuesFilterResponse = await settings.axios.get(
        `${ApiSettings.API_URL}repositories`
      );
      if (response && response.data && response.data.repositories) {
        return response.data.repositories;
      } else return [];
    } catch (error) {
      // console.log(error)
      return [];
    }
  },
  async loadCollaborators() {
    try {
      const response: IssuesFilterResponse = await settings.axios.get(
        `${ApiSettings.API_URL}collaborators`
      );
      if (response && response.data && response.data.collaborators) {
        return response.data.collaborators;
      } else return [];
    } catch (error) {
      // console.log(error)
      return [];
    }
  },
  async databaseUpdate(): Promise<boolean> {
    try {
      const response: IssuesFilterResponse = await settings.axios.get(
        `${ApiSettings.API_URL}update`
      );
      if (response && response.data && response.data.update) {
        return true;
      }
      return false;
    } catch (error) {
      // console.log(error)
      return false;
    }
  },
  async loadIssuesByAccounting(idAccounting: number): Promise<IssuesRecord[]> {
    try {
      const response: IssuesResponse = await settings.axios.get(
        `${ApiSettings.API_URL}issues/account/${idAccounting}`
      );
      if (response && response.data && response.data.issues) {
        return response.data.issues;
      } else return [];
    } catch (error) {
      // console.log(error)
      return [];
    }
  },
  getStats(issues: IssuesRecord[]) {
    const result = {
      issuesCount: 0,
      issuesHours: 0
    };

    issues.forEach(issue => {
      result.issuesCount += 1;
      result.issuesHours += issue.hours ? issue.hours : 0;
    });

    return result;
  }
};
