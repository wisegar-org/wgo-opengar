import { defineStore } from "pinia";
import { IssuesOptionsService } from "src/services/Finance/IssuesOptionsService/IssuesOptionsService";

export const appFinanceFiltersStoreId = "appFinanceFiltersStore";

export const useAppFinanceFiltersStore = defineStore({
  id: appFinanceFiltersStoreId,
  state: () => ({
    labels: [] as any[],
    assignedTo: [] as any[],
    repository: [] as any[],
    project: [] as any[],
  }),
  getters: {
    labelsOptions(state) {
      return state.labels
        .filter((item) => !!item.title)
        .map((item) => item.title);
    },
    assignedToOptions(state) {
      return state.assignedTo
        .filter((item) => !!item.login)
        .map((item) => item.login);
    },
    repositoryOptions(state) {
      return state.repository
        .filter((item) => !!item.title)
        .map((item) => item.title);
    },
    projectOptions(state) {
      return state.project
        .filter((item) => !!item.title)
        .map((item) => item.title);
    },
  },
  actions: {
    async loadData(force?: boolean) {
      const optionsService = new IssuesOptionsService();
      if (this.labels.length === 0 || force) {
        this.labels = await optionsService.loadLabelsOptions();
      }
      if (this.project.length === 0 || force) {
        this.project = await optionsService.loadProjectOptions();
      }
      if (this.repository.length === 0 || force) {
        this.repository = await optionsService.loadRepositoryOptions();
      }
      if (this.assignedTo.length === 0 || force) {
        this.assignedTo = await optionsService.loadAssignedToOptions();
      }
    },
  },
});
