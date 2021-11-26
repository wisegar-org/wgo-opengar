import { Action, Getter } from 'vuex-class';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { githubActions, githubGetters, githubNamespace } from '../../store';
import { BillFilter, BillRecord } from '../../models/models';
import { ColumnsBills } from './ColumnsBills';
import AddBillEditorDialog from './BillsEditor/AddBillEditorDialog.vue';
import ViewerBillDialog from './BillsViewer/ViewerBillDialog.vue';
import { ApiSettings } from '../../settings/ApiSettings';
import { filterBills } from './FilterBills';
import { LocalStorageSettings } from '../../settings/LocalStorageSettings';
import { getBillStatusOptions } from '../../models/parsers';
import FilterSelect from '../FilterSelect.vue';
import ConfirmDialog from '../../../wgo/components/ConfirmDialog/ConfirmDialog.vue';
import { GithubPaths } from '../../router';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../../wgo/store/ComponentsState';
import { UserLogged } from 'src/modules/wgo/models/models';
import { INotify } from 'src/modules/wgo/models';

@Component({
  components: {
    AddBillEditorDialog,
    ViewerBillDialog,
    FilterSelect,
    ConfirmDialog
  }
})
export default class Bills extends Vue {
  @Action(githubActions.loadBills, { namespace: githubNamespace })
  loadData!: (force: boolean) => Promise<void>;
  @Action(githubActions.loadOrganizationData, { namespace: githubNamespace })
  loadOrganizationData!: () => Promise<void>;
  @Action(githubActions.loadBillDetail, { namespace: githubNamespace })
  loadDetails!: (record: BillRecord) => Promise<BillRecord>;
  @Action(githubActions.changeStatusToPayed, { namespace: githubNamespace })
  changeStatusToPayed!: (record: BillRecord) => Promise<BillRecord>;
  @Action(githubActions.changeStatusToCancelled, { namespace: githubNamespace })
  changeStatusToCancelled!: (record: BillRecord) => Promise<BillRecord>;
  @Action(githubActions.sendBillLink, { namespace: githubNamespace })
  sendBillEmail!: (record: BillRecord) => Promise<boolean>;

  @Action(githubActions.loadProducts, { namespace: githubNamespace })
  loadProducts!: (force: boolean) => Promise<void>;
  @Action(githubActions.loadAllCollaborators, { namespace: githubNamespace })
  loadCollaborators!: (force: boolean) => Promise<void>;

  @Getter(githubGetters.getBills, { namespace: githubNamespace })
  bills!: BillRecord[];
  filterBills: BillRecord[] = this.bills;

  @Getter(ApiSettings.USER_LOGGED_GETTER, {
    namespace: ApiSettings.USER_NAMESPACE
  })
  userLogged!: UserLogged;

  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  statusOptions = getBillStatusOptions();

  loading = false;
  columns = ColumnsBills;
  showAddBillDialog = false;
  showConfirmStatusDialog = false;
  showViewBillDialog = false;
  selectedBill: BillRecord | null = null;

  textConfirm = '';
  clientBill = '';
  filter: BillFilter;
  isToPay = false;

  constructor() {
    super();
    this.filterBills = this.bills ? this.bills : [];
    this.filter =
      this.getFilterStore() ||
      <BillFilter>{
        client: ''
      };
    if (this.filter) {
      this.clientBill = this.filter.client;
    }
  }

  async showEditBillDialog(record: BillRecord | null) {
    if (record) {
      this.loading = true;
      const bill = record ? await this.loadDetails(record) : record;
      this.loading = false;
      this.selectedBill = bill;
    } else {
      this.selectedBill = record;
    }

    this.showAddBillDialog = true;
  }

  async showBillDialog(record: BillRecord) {
    this.loading = true;
    const bill = await this.loadDetails(record);
    this.loading = false;
    this.selectedBill = bill;
    this.showViewBillDialog = true;
  }

  @Watch('filter')
  @Watch('bills')
  setfilterBills() {
    localStorage.setItem(
      LocalStorageSettings.KEY_BILLS_FILTER,
      JSON.stringify(this.filter)
    );
    this.filterBills = filterBills(this.bills, this.filter);
  }

  @Watch('clientBill')
  setNameFilter(value: string) {
    this.filter = { ...this.filter, client: value };
  }

  setStatus(prop: { value: number; label: string } | null) {
    this.filter = {
      ...this.filter,
      status: prop ? prop : undefined
    };
  }

  getFilterStore() {
    const filters = localStorage.getItem(LocalStorageSettings.KEY_BILLS_FILTER);
    return filters ? (JSON.parse(filters) as BillFilter) : null;
  }

  setConfirmStatusDialog(record: BillRecord, toPay: boolean) {
    this.selectedBill = record;
    this.isToPay = toPay;
    this.textConfirm = `Are you sure you want to change the status to "${
      toPay ? 'payed' : 'cancelled'
    }"?`;
    this.showConfirmStatusDialog = true;
  }

  async sendBillLink(record: BillRecord) {
    if (record && record.client && record.client.email) {
      this.loading = true;
      if (await this.sendBillEmail(record)) {
        this.notify({
          message: 'Bill sended successfully ',
          type: 'positive'
        });
      } else {
        this.notify({
          message: 'Send bill fail',
          type: 'negative'
        });
      }
      this.loading = false;
    } else {
      this.notify({
        message: 'Client email property is empty',
        type: 'negative'
      });
    }
  }

  async changeStatus(confirm: boolean) {
    this.showConfirmStatusDialog = false;
    if (confirm && this.selectedBill) {
      this.loading = true;
      if (
        await (this.isToPay
          ? this.changeStatusToPayed
          : this.changeStatusToCancelled)(<BillRecord>{
          id: this.selectedBill.id
        })
      ) {
        this.notify({
          message: 'Bill status changed successfully ',
          type: 'positive'
        });
      }

      this.loading = false;
    }
  }

  goToBillTemplate() {
    void this.$router.push(GithubPaths.billTemplatePage.url);
  }

  async mounted() {
    this.loading = true;
    await this.loadOrganizationData();
    await this.loadData(false);
    await this.loadProducts(false);
    await this.loadCollaborators(false);
    this.setfilterBills();
    this.loading = false;
  }
}
