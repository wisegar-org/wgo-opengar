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
import { TranslationsKeys } from './TranslationsKeys';
import { FilterAccountings, IFilterAccounting } from './FilterAccountings';
import ExpandableListFilterLabel from 'src/modules/wgo/components/ExpandableList/ExpandableListFilter/ExpandableListFilterLabel.vue';
import ConfirmDialog from 'src/modules/wgo/components/ConfirmDialog/ConfirmDialog.vue';

@Component({
  components: {
    AccountingStepperDialog,
    AccountingDetailsDialog,
    AccountingEditorDialog,
    AccountingConfirmDialog,
    AccountingPrintDialog,
    AccountingList,
    ExpandableListFilterLabel,
    ConfirmDialog
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
  columns = ListColumnsAccounting;
  showAccountingDetails = false;
  showAccountingEditor = false;
  showAccountingConfirm = false;
  showAccountingPrint = false;
  accountingSelected: AccountRecord | null = null;
  headerButtons = [];
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
    }
  }

  async sendEmailAccounting(accounting: AccountRecord) {
    if (accounting && accounting.contributor && accounting.contributor.email) {
      this.loading = true;
      if (await this.sendLink(accounting)) {
        this.notify({
          message: 'Accounting sended successfully ',
          type: 'positive'
        });
      } else {
        this.notify({
          message: 'Send accounting fail',
          type: 'negative'
        });
      }
      this.loading = false;
    } else {
      this.notify({
        message: 'Collaborator email property is empty',
        type: 'negative'
      });
    }
  }

  async loadAccountiPreview(accounting: AccountRecord) {
    if (accounting && accounting.contributor) {
      this.loading = true;
      const previewLink = await this.getAccountingPreview(accounting);
      if (previewLink) {
        openURL(previewLink);
      } else {
        this.notify({
          message: 'Preview accounting link fail',
          type: 'negative'
        });
      }
      this.loading = false;
    } else {
      this.notify({
        message: 'Collaborator property is empty',
        type: 'negative'
      });
    }
  }

  async deleteAccount() {
    if (this.selectedToCancel) {
      this.loading = true;
      if (await this.deleteAccountAction(this.selectedToCancel.id)) {
        this.notify({
          message: 'Success',
          type: 'positive'
        });
        this.showDeleteConfirm = false;
      } else {
        this.notify({
          message: 'Fail',
          type: 'negative'
        });
      }
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
  }

  showDeleteConfirmDialog(item: AccountRecord) {
    this.showDeleteConfirm = true;
    this.selectedToCancel = item;
  }

  updateContent(record: AccountRecord) {
    switch (record.status) {
      case 1:
        record.statusTranslation = this.translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_PENDING;
        break;
      case 2:
        record.statusTranslation = this.translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_CONFIRMED;
        break;
      case 3:
        record.statusTranslation = this.translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_CANCELLED;
        break;
      default:
        record.statusTranslation = this.translationContent.WGO_FINANCE_ACCOUNTING_COLUMN_STATUS_PENDING;
        break;
    }
    return record;
  }

  async mounted() {
    this.loading = true;
    await this.registerTranslations(TranslationsKeys);
    this.updateTranslations();
    await this.loadData(false);
    await this.loadIssues(false);
    await this.loadCollaborators(false);
    await this.loadOrganizationData(false);
    this.loading = false;
  }
}
