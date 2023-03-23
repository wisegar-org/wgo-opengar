import { Module } from 'vuex'
import state, { GithubStateInterface } from './state'
import { getGithubActions } from './actions'
import { getGithubGetters } from './getters'
import { getGithubMutations } from './mutations'

export { githubMutations } from './mutations'
export { githubGetters } from './getters'
export { githubActions } from './actions'

export const githubNamespace = 'githubStoreModule'

export const getGithubModule = (StateInterface: any) => {
  const actions = getGithubActions(StateInterface)
  const getters = getGithubGetters(StateInterface)
  const mutations = getGithubMutations()

  const GithubModule: Module<GithubStateInterface, typeof StateInterface> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
  }

  return GithubModule
}
