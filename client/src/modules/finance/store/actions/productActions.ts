import { ActionTree } from 'vuex';
import { ProductRecord } from '../../models/models';
import { ProductService } from '../../services/ProductService';
import { githubMutations } from '../mutations';
import { GithubStateInterface } from '../state';

export const productsActions = {
  loadProducts: 'loadProducts',
  loadProductDetail: 'loadProductDetail',
  addProduct: 'addProduct',
  updateProduct: 'updateProduct'
};

export const getGithubProductsActions = (StateInterface: unknown) => {
  const actions: ActionTree<GithubStateInterface, typeof StateInterface> = {
    async loadProducts({ state, commit }, force): Promise<void> {
      if (force || state.products.length === 0) {
        const products = await ProductService.loadProducts();
        commit(githubMutations.setProducts, products);
      }
    },
    async loadProductDetail({}, record: ProductRecord) {
      const product = await ProductService.loadProductDetail(record);
      return product;
    },
    async addProduct({ dispatch }, record: ProductRecord) {
      const result = await ProductService.addProduct(record);
      if (result) {
        await dispatch(productsActions.loadProducts, true);
      }
      return !!result;
    },
    async updateProduct({ dispatch }, record: ProductRecord) {
      const result = await ProductService.updateProduct(record);
      if (result) {
        await dispatch(productsActions.loadProducts, true);
      }
      return !!result;
    }
  };

  return actions;
};
