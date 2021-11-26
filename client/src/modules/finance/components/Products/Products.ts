import { Action, Getter } from 'vuex-class';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { githubActions, githubGetters, githubNamespace } from '../../store';
import { ProductFilter, ProductRecord } from '../../models/models';
import { ColumnsProducts } from './ColumnsProducts';
import AddProductEditorDialog from './ProductsEditor/AddProductEditorDialog.vue';
import ViewerProductDialog from './ProductsViewer/ViewerProductDialog.vue';
import { ApiSettings } from '../../settings/ApiSettings';
import FilterSelect from '../FilterSelect.vue';
import { filterProducts, typeOptions } from './FilterProducts';
import { LocalStorageSettings } from '../../settings/LocalStorageSettings';
import { UserLogged } from 'src/modules/wgo/models/models';

@Component({
  components: {
    AddProductEditorDialog,
    ViewerProductDialog,
    FilterSelect
  }
})
export default class Products extends Vue {
  @Action(githubActions.loadProducts, { namespace: githubNamespace })
  loadData!: (force: boolean) => Promise<void>;
  @Action(githubActions.loadProductDetail, { namespace: githubNamespace })
  loadDetails!: (record: ProductRecord) => Promise<ProductRecord>;

  @Getter(githubGetters.getProducts, { namespace: githubNamespace })
  products!: ProductRecord[];
  filterProducts: ProductRecord[] = this.products;

  @Getter(ApiSettings.USER_LOGGED_GETTER, {
    namespace: ApiSettings.USER_NAMESPACE
  })
  userLogged!: UserLogged;

  loading = false;
  columns = ColumnsProducts;
  showAddProductDialog = false;
  showConfirmPayDialog = false;
  showViewProductDialog = false;
  selectedProduct: ProductRecord | null = null;
  typeOptions = typeOptions;

  nameProductFilter = '';
  filter: ProductFilter;

  constructor() {
    super();
    this.filterProducts = this.products ? this.products : [];
    this.filter =
      this.getFilterStore() ||
      <ProductFilter>{
        type: undefined,
        name: ''
      };
    this.nameProductFilter = this.filter ? this.filter.name : '';
  }

  showConfimDialog(record: ProductRecord) {
    this.selectedProduct = record;
    this.showConfirmPayDialog = true;
  }

  async showEditProductDialog(record: ProductRecord | null) {
    if (record) {
      this.loading = true;
      const product = record ? await this.loadDetails(record) : record;
      this.loading = false;
      this.selectedProduct = product;
    } else {
      this.selectedProduct = record;
    }

    this.showAddProductDialog = true;
  }

  async showProductDialog(record: ProductRecord) {
    this.loading = true;
    const product = await this.loadDetails(record);
    this.loading = false;
    this.selectedProduct = product;
    this.showViewProductDialog = true;
  }

  @Watch('filter')
  @Watch('products')
  setfilterProducts() {
    localStorage.setItem(
      LocalStorageSettings.KEY_PRODUCTS_FILTER,
      JSON.stringify(this.filter)
    );
    this.filterProducts = filterProducts(this.products, this.filter);
  }

  setType(prop: { value: number; label: string } | null) {
    this.filter = {
      ...this.filter,
      type: prop ? prop : undefined
    };
  }

  @Watch('nameProductFilter')
  setNameFilter(value: string) {
    this.filter = { ...this.filter, name: value };
  }

  getFilterStore() {
    const filters = localStorage.getItem(
      LocalStorageSettings.KEY_PRODUCTS_FILTER
    );
    return filters ? (JSON.parse(filters) as ProductFilter) : null;
  }

  async mounted() {
    this.loading = true;
    await this.loadData(false);
    this.setfilterProducts();
    this.loading = false;
  }
}
