import { Action, Getter } from 'vuex-class';
import {
  BillRecord,
  CollaboratorRecord,
  ProductRecord,
  ProductsBill,
  OrganizationDataRecord
} from '../../../models/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { githubActions, githubGetters, githubNamespace } from '../../../store';
import MediaListEditor from '../../../../wgo/components/MediaList/MediaListEditor.vue';
import FilterSelect from '../../FilterSelect.vue';
import { ColumnsProductsBill } from '../ColumnsBills';
import AddProductBillDialog from './AddProductBillDialog.vue';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../../../wgo/store/ComponentsState';
import { INotify } from 'src/modules/wgo/models';
import QEditor from '../../../../wgo/components/QEditor.vue';

@Component({
  components: {
    MediaListEditor,
    FilterSelect,
    AddProductBillDialog,
    QEditor
  }
})
export default class AddBillEditor extends Vue {
  @Prop() close!: () => void;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Prop() billToEdit!: BillRecord;

  @Action(githubActions.loadOrganizationData, { namespace: githubNamespace })
  loadOrganizationData!: () => Promise<void>;
  @Getter(githubGetters.getOrganizationData, { namespace: githubNamespace })
  organizationData!: OrganizationDataRecord;
  @Getter(githubGetters.getProducts, { namespace: githubNamespace })
  products!: ProductRecord[];
  @Getter(githubGetters.getCollaborators, { namespace: githubNamespace })
  collaborators!: CollaboratorRecord[];
  @Action(githubActions.addBill, { namespace: githubNamespace })
  addBill!: (record: BillRecord) => Promise<boolean>;
  @Action(githubActions.updateBill, { namespace: githubNamespace })
  updateBill!: (record: BillRecord) => Promise<boolean>;

  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  bill: BillRecord = <BillRecord>{
    id: 0,
    name: '',
    description: '',
    totalPrice: 0,
    clientId: 0,
    discount: 0,
    observations: '',
    validDays: this.organizationData?.bankValidDays || 30
  };
  isUpdateBill: boolean;
  docsToAdd: number[] = [];
  billClient: CollaboratorRecord | null = null;
  billProducts: {
    [key: number]: ProductsBill;
  } = {};

  selectedProductBill: ProductsBill | null = null;

  columns = ColumnsProductsBill;

  showAddEditProductBillDialog = false;

  constructor() {
    super();
    this.isUpdateBill = !!this.billToEdit;
    this.bill = this.isUpdateBill
      ? this.billToEdit
      : <BillRecord>{
          id: 0,
          name: '',
          description: '',
          totalPrice: 0,
          clientId: 0,
          observations: '',
          discount: 0,
          validDays: this.organizationData?.bankValidDays || 30
        };
    if (this.isUpdateBill) {
      this.billProducts = this.getProducts();
    }
  }

  getProducts() {
    const billProducts: {
      [key: number]: ProductsBill;
    } = {};
    if (this.billToEdit) {
      this.billClient = this.billToEdit.client;
      this.billToEdit.products.forEach(prod => {
        const prodRecord = prod.product;
        billProducts[prod.productId] = {
          ...prod,
          maxCount: prod.count + (prodRecord ? prodRecord.unitCount : 0),
          type: prodRecord ? prodRecord.type : 1,
          remove: false
        };
      });
    }
    return billProducts;
  }

  setCollaborator(collaborator: CollaboratorRecord) {
    if (collaborator !== null) {
      this.billClient = collaborator;
      this.bill.clientId = collaborator.id;
    } else {
      this.bill.clientId = 0;
    }
  }

  getValidCollaborators() {
    return this.collaborators; //.filter((collaborator) => !!collaborator.card_number)
  }

  setShowAddEditProductBillDialog(record: ProductsBill | null) {
    this.selectedProductBill = record;
    this.showAddEditProductBillDialog = true;
  }

  addProductToBill(record: ProductsBill) {
    if (
      this.selectedProductBill &&
      record.productId !== this.selectedProductBill.productId
    ) {
      this.billProducts[this.selectedProductBill.productId].remove = true;
    }
    this.billProducts = { ...this.billProducts, [record.productId]: record };
    this.selectedProductBill = null;
    this.showAddEditProductBillDialog = false;
  }

  getProductsList(record: ProductsBill | null) {
    return this.products.filter(
      prod =>
        !(prod.id in this.billProducts) ||
        this.billProducts[prod.id].remove ||
        (!!record && prod.id === record.productId)
    );
  }

  onDeleteProduct(record: ProductsBill) {
    this.billProducts[record.productId].remove = true;
  }

  isValid() {
    return (
      !!this.bill &&
      !!this.bill.name &&
      !!this.bill.clientId &&
      this.billProducts &&
      Object.values(this.billProducts || {}).filter(
        billProd => !billProd.remove
      )
    );
  }

  getPrice() {
    let price = Object.values(this.billProducts)
      .filter(prod => !prod.remove)
      .map(prod => prod.count * prod.price)
      .reduce((a, b) => a + b, 0);
    price = this.roundNumber(price);
    const discount = parseFloat(`${this.bill.discount}`);
    if (discount) {
      const ToDiscount = Math.floor(price * discount) / 100;
      return `${this.roundNumber(price - ToDiscount)} ( ${price} )`;
    }
    return price;
  }

  async addBillClick() {
    this.showLoading(true);
    const billProducts = Object.values(this.billProducts);
    const totalPrice = billProducts
      .filter(prod => !prod.remove)
      .map(prod => prod.count * prod.price)
      .reduce((a, b) => a + b, 0);
    const result = this.isUpdateBill
      ? await this.updateBill(<BillRecord>{
          id: this.billToEdit.id,
          name: this.bill.name,
          description: this.bill.description,
          totalPrice: this.roundNumber(totalPrice),
          clientId: this.billClient ? this.billClient.id : 0,
          products: billProducts,
          discount: parseFloat(`${this.bill.discount}`),
          observations: this.bill.observations,
          sendDate: this.bill.sendDate,
          validDays: parseInt(`${this.bill.validDays}`),
          docs: this.docsToAdd
        })
      : await this.addBill(<BillRecord>{
          name: this.bill.name,
          description: this.bill.description,
          totalPrice: totalPrice,
          clientId: this.billClient ? this.billClient.id : 0,
          products: billProducts,
          discount: parseFloat(`${this.bill.discount}`),
          validDays: parseInt(`${this.bill.validDays}`),
          observations: this.bill.observations,
          docs: this.docsToAdd
        });
    this.showLoading(false);
    if (result) {
      this.notify({
        message: `Bill ${
          this.isUpdateBill ? 'updated' : 'created'
        } successfully`,
        type: 'positive'
      });
      if (!!this.close) {
        this.close();
      }
    }
  }

  roundNumber(num: number) {
    return Math.floor(num * 100) / 100;
  }

  async mounted() {
    await this.loadOrganizationData();
    if (!this.isUpdateBill) {
      this.bill.validDays = this.organizationData.bankValidDays;
    }
  }
}
