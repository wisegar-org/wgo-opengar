import { ActionTree } from 'vuex';
import { OrganizationDataRecord } from '../../models/models';
import { OrganizationService } from '../../services/OrganizationService';
import { githubMutations } from '../mutations';
import { GithubStateInterface } from '../state';

export const organizationActions = {
  loadOrganizationData: 'loadOrganizationData',
  updateOrganizationData: 'updateOrganizationData'
};

export const getGithubOrganizationActions = (StateInterface: unknown) => {
  const actions: ActionTree<GithubStateInterface, typeof StateInterface> = {
    async loadOrganizationData({ commit, state }, force = true): Promise<void> {
      if (force || !state.organizationData || !state.organizationData.name) {
        const response = await OrganizationService.loadOrganizationData();
        commit(githubMutations.setOrganizationData, response);
      }
    },
    async updateOrganizationData(
      { commit },
      organizationData: OrganizationDataRecord
    ): Promise<void> {
      const response = await OrganizationService.setOrganizationData(
        organizationData
      );
      commit(githubMutations.setOrganizationData, response);
    }
  };

  return actions;
};
