import { Action, Getter } from 'vuex-class';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { githubActions, githubGetters, githubNamespace } from '../../store';
import { AccountRecord } from '../../models/models';
import {
  ColumnsAccounting,
  ListColumnsAccounting,
  setColumnsLanguage
} from './ColumnsAccounting';

import AccountingStepperDialog from './AccountingStepper/AccountingStepperDialog.vue';
import AccountingDetailsDialog from './AccountingDetailsDialog/AccountingDetailsDialog.vue';
import AccountingEditorDialog from './AccountingEditor/AccountingEditorDialog.vue';
import AccountingConfirmDialog from './AccountingConfirmDialog/AccountingConfirmDialog.vue';
import AccountingPrintDialog from './AccountingPrintDialog/AccountingPrintDialog.vue';
import { openURL } from 'quasar';
import { ApiSettings } from '../../settings/ApiSettings';
import { GithubPaths } from '../../router';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../../wgo/store/ComponentsState';
import { INotify } from 'src/modules/wgo/models';
import { UserLogged } from 'src/modules/wgo/models/models';
import AccountingList from './AccountingList/AccountingList.vue';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import {
  TranslationsKeys,
  WGO_FINANCE_ACCOUNTING_COLUMN_STATUS,
  WGO_FINANCE_ACCOUNTING_COLUMN_NAME,
  WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_PENDING,
  WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_CONFIRMED,
  WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_CANCELLED
} from './TranslationsKeys';
import { FilterAccountings, IFilterAccounting } from './FilterAccountings';
import ExpandableListFilterLabel from 'src/modules/wgo/components/ExpandableList/ExpandableListFilter/ExpandableListFilterLabel.vue';
import ConfirmDialog from 'src/modules/wgo/components/ConfirmDialog/ConfirmDialog.vue';
import { LocalStorageSettings } from '../../settings/LocalStorageSettings';
import AccountingFilterDialog from './AccountingFilter/AccountingFilterDialog.vue';
import { sendNotifyMesagge, senFailNotifyMessage } from './AccountingMessage';

@Component({
  components: {
    AccountingStepperDialog,
    AccountingDetailsDialog,
    AccountingEditorDialog,
    AccountingConfirmDialog,
    AccountingPrintDialog,
    AccountingList,
    ExpandableListFilterLabel,
    ConfirmDialog,
    AccountingFilterDialog
  }
})
export default class Accountings extends Vue {
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: any;

  @Action(githubActions.deleteAccount, { namespace: githubNamespace })
  deleteAccountAction!: (idAccounting: number) => Promise<boolean>;

  @Action(githubActions.loadAllAcounting, { namespace: githubNamespace })
  loadData!: (force: boolean) => Promise<void>;
  @Action(githubActions.exportToPdf, { namespace: githubNamespace })
  exportToPdf!: (idAccounting: number) => Promise<Blob | undefined>;
  @Action(githubActions.sendAccountingLink, { namespace: githubNamespace })
  sendLink!: (record: AccountRecord) => Promise<boolean>;
  @Action(githubActions.getAccountingPreview, { namespace: githubNamespace })
  getAccountingPreview!: (record: AccountRecord) => Promise<string>;
  @Action(githubActions.loadAllCollaborators, { namespace: githubNamespace })
  loadCollaborators!: (force: boolean) => Promise<void>;
  @Action(githubActions.loadIssues, { namespace: githubNamespace })
  loadIssues!: (force: boolean) => Promise<void>;
  @Action(githubActions.loadOrganizationData, { namespace: githubNamespace })
  loadOrganizationData!: (force: boolean) => Promise<void>;
  @Getter(githubGetters.getAccounting, { namespace: githubNamespace })
  accounting!: AccountRecord[];
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  @Getter(ApiSettings.USER_LOGGED_GETTER, {
    namespace: ApiSettings.USER_NAMESPACE
  })
  userLogged!: UserLogged;

  loading = true;
  showFilter = false;
  columns = ListColumnsAccounting;
  showAccountingDetails = false;
  showAccountingEditor = false;
  showAccountingConfirm = false;
  showAccountingPrint = false;
  accountingSelected: AccountRecord | null = null;
  setFilterBtn = {
    click: () => {
      this.openFilterDialog();
    },
    icon: 'filter_alt',
    tooltip: 'Set Filter'
  };
  headerButtons = [this.setFilterBtn];
  filterStr = '';
  filterAccounting!: AccountRecord[];
  filters: IFilterAccounting = <IFilterAccounting>{};

  showDeleteConfirm = false;
  selectedToCancel: AccountRecord | null = null;

  /**
   *
   */
  constructor() {
    super();
    this.filterAccounting = [];
    this.$nextTick(() => {});
  }

  openAccountingDetails(accounting: AccountRecord) {
    this.accountingSelected = accounting;
    this.showAccountingDetails = true;
  }

  openEditor(accounting: AccountRecord) {
    this.accountingSelected = accounting;
    this.showAccountingEditor = true;
  }

  async exportPdf(accounting: AccountRecord) {
    if (accounting) {
      this.loading = true;
      const response = await this.exportToPdf(accounting.id);
      if (response !== undefined) {
        const blob = new Blob([response], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${accounting.payment_code}.pdf`;
        link.click();
      }
      this.loading = false;
    } else {
      senFailNotifyMessage(
        this.notify,
        this.translationContent.WGO_FINANCE_ACCOUNTING_EXPORT_FAIL
      );
    }
  }

  async sendEmailAccounting(accounting: AccountRecord) {
    if (accounting && accounting.contributor && accounting.contributor.email) {
      this.loading = true;
      sendNotifyMesagge(
        await this.sendLink(accounting),
        this.notify,
        this.translationContent.WGO_FINANCE_ACCOUNTING_SEND_SUCCESS,
        this.translationContent.WGO_FINANCE_ACCOUNTING_SEND_FAIL
      );
      this.loading = false;
    } else {
      senFailNotifyMessage(
        this.notify,
        this.translationContent.WGO_FINANCE_ACCOUNTING_SEND_FAIL_EMAIL_EMPTY
      );
    }
  }

  async loadAccountiPreview(accounting: AccountRecord) {
    if (accounting && accounting.contributor) {
      this.loading = true;
      const previewLink = await this.getAccountingPreview(accounting);
      if (previewLink) {
        openURL(previewLink);
      } else {
        senFailNotifyMessage(
          this.notify,
          this.translationContent.WGO_FINANCE_ACCOUNTING_PREVIEW_FAIL
        );
      }
      this.loading = false;
    } else {
      senFailNotifyMessage(
        this.notify,
        this.translationContent
          .WGO_FINANCE_ACCOUNTING_PREVIEW_FAIL_COLLABORATOR_EMPTY
      );
    }
  }

  async deleteAccount() {
    if (this.selectedToCancel) {
      this.loading = true;
      const result = await this.deleteAccountAction(this.selectedToCancel.id);
      if (result) {
        this.showDeleteConfirm = false;
      }
      sendNotifyMesagge(
        result,
        this.notify,
        this.translationContent.WGO_FINANCE_ACCOUNTING_CANCEL_SUCCESS,
        this.translationContent.WGO_FINANCE_ACCOUNTING_CANCEL_FAIL
      );
      this.loading = false;
    }
  }

  goToGithub(row: AccountRecord) {
    openURL('http://github.com/' + row.contributor.login);
  }

  goToConfirmAccount(row: AccountRecord) {
    this.accountingSelected = row;
    this.showAccountingConfirm = true;
  }

  printPdf(row: AccountRecord) {
    this.accountingSelected = row;
    this.showAccountingPrint = true;
  }

  showConfirmMenuItem(row: AccountRecord): boolean {
    return row.status === 1;
  }

  goToAccountingTemplate() {
    void this.$router.push(GithubPaths.accountingTemplatePage.url);
  }

  @Watch('accounting')
  @Watch('translationContent')
  updateTranslations() {
    this.filterAccounting = FilterAccountings(
      this.accounting,
      this.filters
    ).map(record => this.updateContent(record));
    setColumnsLanguage(this.translationContent);
    this.setFilterBtn.tooltip = this.translationContent.WGO_FINANCE_ACCOUNTING_FILTER_TITLE;
  }

  showDeleteConfirmDialog(item: AccountRecord) {
    this.showDeleteConfirm = true;
    this.selectedToCancel = item;
  }

  updateContent(record: AccountRecord) {
    record.statusTranslation = this.getStatusTranslation(record.status);
    return record;
  }

  openFilterDialog() {
    this.showFilter = true;
  }

  applyFilter(filter: IFilterAccounting) {
    this.filters = { ...filter };
    localStorage.setItem(
      LocalStorageSettings.KEY_ACCOUNTING_FILTER,
      JSON.stringify(this.filters)
    );
    this.updateTranslations();
    this.filterStr = this.getFilterStr(this.filters);
  }

  getFilterStore() {
    const filtersJson = localStorage.getItem(
      LocalStorageSettings.KEY_ACCOUNTING_FILTER
    );
    if (filtersJson) {
      const filter = JSON.parse(filtersJson) as IFilterAccounting;
      if (filter) {
        this.filters = { ...filter };
      }
      this.filterStr = this.getFilterStr(filter);
      return filter;
    }
    return <IFilterAccounting>{};
  }

  getFilterStr(filters: IFilterAccounting) {
    const equalLabel = this.getLabel('WGO_EQUAL_LABEL');
    const containLabel = this.getLabel('WGO_CONTAIN_LABEL');
    const andLabel = this.getLabel('WGO_AND_LABEL');
    if (!filters) return '';
    const result: string[] = [];
    if (filters.name)
      result.push(
        `${this.getLabel(
          WGO_FINANCE_ACCOUNTING_COLUMN_NAME
        )} ${containLabel} <${filters.name}>`
      );
    if (filters.status)
      result.push(
        `${this.getLabel(
          WGO_FINANCE_ACCOUNTING_COLUMN_STATUS
        )} ${containLabel} <${this.getLabel(filters.status)}>`
      );

    return result.join(` ${andLabel} `);
  }

  getStatusTranslation(status: number) {
    switch (status) {
      case 1:
        return this.getLabel(WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_PENDING);
      case 2:
        return this.getLabel(WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_CONFIRMED);
      case 3:
        return this.getLabel(WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_CANCELLED);
      default:
        return this.getLabel(WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_PENDING);
    }
  }

  getLabel(label: string) {
    if (this.translationContent && label in this.translationContent)
      return (this.translationContent as any)[label];
    return label;
  }

  async mounted() {
    this.loading = true;
    this.getFilterStore();
    await this.registerTranslations(TranslationsKeys);
    await this.loadData(false);
    await this.loadIssues(false);
    await this.loadCollaborators(false);
    await this.loadOrganizationData(false);
    this.updateTranslations();
    this.loading = false;
  }
}
