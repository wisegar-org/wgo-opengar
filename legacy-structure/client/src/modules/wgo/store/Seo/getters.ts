import { GetterTree } from 'vuex';
import { StateInterface } from 'src/store';
import { SeoStateInterface } from './state';

export const seoGetters = {
  getSeoData: 'getSeoData'
};

const getters: GetterTree<SeoStateInterface, StateInterface> = {
  getSeoData(state) {
    return state.seo;
  }
};

export default getters;
