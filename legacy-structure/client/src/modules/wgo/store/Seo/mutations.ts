import { SeoResponseGql } from 'src/graphql';
import { MutationTree } from 'vuex';
import { SeoStateInterface } from './state';

export const seoMutations = {
  setSeoData: 'setSeoData'
};

export const mutations: MutationTree<SeoStateInterface> = {
  setSeoData(state, seo: SeoResponseGql) {
    state.seo = seo;
  }
};
