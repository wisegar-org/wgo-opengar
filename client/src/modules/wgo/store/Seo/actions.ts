import { SeoInputGql, SeoResponseGql } from 'src/graphql';
import { ActionTree } from 'vuex';
import { StateInterface } from 'src/store';
import { SeoStateInterface } from './state';
import { SeoService } from '../../services/SeoService';
import { ServiceProvider } from '@wisegar-org/wgo-opengar-shared';
import { seoMutations } from '.';

const seoService: SeoService = ServiceProvider.GetScoped(SeoService);

export const seoActions = {
  loadSeoData: 'loadSeoData',
  setSeoData: 'setSeoData'
};

const actions: ActionTree<SeoStateInterface, StateInterface> = {
  async loadSeoData({ state, commit }, force = false): Promise<SeoResponseGql> {
    if (force || !state.seo || !('path' in state.seo)) {
      const result = await seoService.getSeoData();
      commit(seoMutations.setSeoData, result);
    }
    return state.seo;
  },
  async setSeoData({ dispatch }, arg: SeoInputGql): Promise<boolean | null> {
    const result = await seoService.setSeoData(arg);
    if (result) {
      await dispatch(seoActions.loadSeoData, true);
    }
    return result;
  }
};

export default actions;
