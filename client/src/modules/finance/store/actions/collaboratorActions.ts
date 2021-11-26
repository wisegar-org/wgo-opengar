import { ActionTree } from 'vuex';
import { CollaboratorRecord, WeeklyStats } from '../../models/models';
import { CollaboratorService } from '../../services/CollaboratorService';
import { githubMutations } from '../mutations';
import { GithubStateInterface } from '../state';

export const collaboratorActions = {
  addClientProvider: 'addClientProvider',
  loadAllCollaborators: 'loadAllCollaborators',
  loadCollaboratorStats: 'loadCollaboratorStats',
  updateCollAccountingProps: 'updateCollAccountingProps'
};

export const getGithubCollaboratorActions = (StateInterface: unknown) => {
  const actions: ActionTree<GithubStateInterface, typeof StateInterface> = {
    async loadAllCollaborators({ commit, state }, force = true): Promise<void> {
      if (force || state.collaborators.length === 0) {
        const collaborators = await CollaboratorService.getAllCollaborators();
        commit(githubMutations.setCollaborators, collaborators);
      }
    },
    async loadCollaboratorStats(
      {},
      idCollaborator: number
    ): Promise<WeeklyStats[]> {
      const stats = await CollaboratorService.loadCollaboratorStats(
        idCollaborator
      );
      return stats;
    },

    async updateCollAccountingProps(
      { dispatch },
      params: CollaboratorRecord
    ): Promise<boolean> {
      const result = await CollaboratorService.editCollaboratorAccProps(params);
      if (result) {
        void (await dispatch(collaboratorActions.loadAllCollaborators));
      }
      return result;
    },
    async addClientProvider({ dispatch }, params: CollaboratorRecord) {
      const result = await CollaboratorService.addClientProvider(params);
      if (result) {
        void (await dispatch(collaboratorActions.loadAllCollaborators));
      }
      return result;
    }
  };

  return actions;
};
