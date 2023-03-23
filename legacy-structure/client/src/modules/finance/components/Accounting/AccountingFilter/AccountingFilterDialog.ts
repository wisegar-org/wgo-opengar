import {
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';
import { ITranslationFinanceAccountingKeys } from '../TranslationsKeys';
import InputText from 'src/modules/wgo/components/InputText/InputText.vue';
import InputSelect from 'src/modules/wgo/components/InputSelect/InputSelect.vue';
import { IFilterAccounting } from '../FilterAccountings';
import {
  pendingStatusType,
  confirmedStatusType,
  cancelledStatusType
} from '../ColumnsAccounting';
import { IInputSelectableOptions } from 'src/modules/wgo/models/IInputOptions';

@Component({
  components: {
    Dialog,
    InputText,
    InputSelect
  }
})
export default class AccountingFilterDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() title!: string;
  @Prop() filters!: IFilterAccounting;
  @Prop({ default: () => {} }) close!: () => unknown;
  @Prop({ default: () => {} }) applyFilter!: (
    filter: IFilterAccounting
  ) => unknown;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationFinanceAccountingKeys;

  showLoading = false;
  filtersEdit: IFilterAccounting;
  selectedStatus = '';

  statusOptions: IInputSelectableOptions[] = [
    pendingStatusType,
    confirmedStatusType,
    cancelledStatusType
  ];

  /**
   *
   */
  constructor() {
    super();
    this.filtersEdit = this.filters
      ? { ...this.filters }
      : <IFilterAccounting>{};
    this.selectedStatus = this.filtersEdit.status || '';
  }

  getTitle() {
    return this.title
      ? this.title
      : this.translationContent.WGO_FINANCE_ACCOUNTING_FILTER_TITLE || 'Filter';
  }

  onResetFilter() {
    this.filtersEdit = <IFilterAccounting>{};
    this.selectedStatus = '';
  }
  onApplyFilter() {
    if (this.applyFilter) this.applyFilter(this.filtersEdit);
    if (this.close) this.close();
  }

  @Watch('filters')
  onFilterChange() {
    this.filtersEdit = this.filters
      ? { ...this.filters }
      : <IFilterAccounting>{};
    this.selectedStatus = this.filtersEdit.status || '';
  }

  @Watch('translationContent')
  onTranslationContentChange() {
    pendingStatusType.label = this.translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_PENDING;
    confirmedStatusType.label = this.translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_CONFIRMED;
    cancelledStatusType.label = this.translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_CANCELLED;
  }

  @Watch('selectedStatus')
  changeSelectedRole() {
    this.filtersEdit.status = this.selectedStatus
      ? (this.selectedStatus as any).value
      : '';
  }

  onClose() {
    if (this.close) this.close();
  }
}
