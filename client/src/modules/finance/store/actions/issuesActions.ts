import { ActionTree } from 'vuex';
import { Dictionary, IssuesRecord } from '../../models/models';
import { IssuesService } from '../../services/IssuesService';
import { githubMutations } from '../mutations';
import { GithubStateInterface } from '../state';
import { collaboratorActions } from './collaboratorActions';
import { organizationActions } from './organizationActions';

export const issuesActions = {
  loadAllIssuesData: 'loadAllIssuesData',
  loadIssues: 'loadIssues',
  getIssuesByCollaborator: 'getIssuesByCollaborator',
  getIssuessByAccount: 'getIssuessByAccount',
  loadLabels: 'loadLabels',
  loadProjects: 'loadProjects',
  loadRepositories: 'loadRepositories',
  loadMilestones: 'loadMilestones'
};

export const getGithubIssuesActions = (StateInterface: unknown) => {
  const actions: ActionTree<GithubStateInterface, typeof StateInterface> = {
    async loadAllIssuesData({ dispatch }, force = true): Promise<void> {
      await dispatch(issuesActions.loadIssues, force);
      await dispatch(issuesActions.loadLabels, force);
      await dispatch(issuesActions.loadProjects, force);
      await dispatch(issuesActions.loadRepositories, force);
      await dispatch(collaboratorActions.loadAllCollaborators, force);
      await dispatch(issuesActions.loadMilestones, force);
      await dispatch(organizationActions.loadOrganizationData, force);
    },
    async loadIssues({ commit, state }, force = true): Promise<void> {
      if (force || state.issues.length === 0) {
        const issues = await IssuesService.loadIssues();
        commit(githubMutations.setIssues, issues);
      }
    },
    getIssuesByCollaborator(
      { state },
      collaborator: Dictionary
    ): IssuesRecord[] {
      const id = parseInt(collaborator.id);
      const filterIssues = state.issues.filter(
        issue => issue.assignedToId === id
      );
      return filterIssues;
    },
    async getIssuessByAccount({}, idAccount: number): Promise<IssuesRecord[]> {
      const issues = await IssuesService.loadIssuesByAccounting(idAccount);
      return issues;
    },
    async loadLabels({ commit, state }, force = true): Promise<void> {
      if (force || state.labels.length === 0) {
        const optionsLabels = await IssuesService.loadLabels();
        commit(githubMutations.setLabels, optionsLabels);
      }
    },
    async loadProjects({ commit, state }, force = true): Promise<void> {
      if (force || state.projects.length === 0) {
        const optionsProjects = await IssuesService.loadProjects();
        commit(githubMutations.setProjects, optionsProjects);
      }
    },
    async loadRepositories({ commit, state }, force = true): Promise<void> {
      if (force || state.repositories.length === 0) {
        const optionsRepository = await IssuesService.loadRepositories();
        commit(githubMutations.setRepositories, optionsRepository);
      }
    },
    async loadMilestones({ commit, state }, force = true): Promise<void> {
      if (force || state.milestones.length === 0) {
        const optionsMilestones = await IssuesService.loadMilestones();
        commit(githubMutations.setMilestones, optionsMilestones);
      }
    }
  };

  return actions;
};
