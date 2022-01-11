import { AccountRecord } from 'src/modules/finance';
import {} from 'src/modules/wgo/components/ExpandableList/models';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { TranslationsKeys } from '../TranslationsKeys';
import AccountingDetails from '../AccountingDetailsDialog/AccountingDetails.vue';
import { ApiSettings } from '../../../settings/ApiSettings';
import { UserLogged } from 'src/modules/wgo/models';
import {
  WGOExpandableListOptions,
  WGOExpandableButton,
  WGOListItem,
  WGOPropToEdit
} from '@wisegar-org/quasar-app-extension-wgo-vue-components/src/lib';
import {
  componentsGettedKeys,
  componentsNamespace
} from 'src/modules/wgo/store/ComponentsState';

@Component({
  components: {
    AccountingDetails
  }
})
export default class AccountingList extends Vue {
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: any;
  @Getter(ApiSettings.USER_LOGGED_GETTER, {
    namespace: ApiSettings.USER_NAMESPACE
  })
  userLogged!: UserLogged;
  @Prop() loading!: boolean;
  @Prop({ default: '' }) filterStr!: boolean;
  @Prop() accountings!: AccountRecord[];
  @Prop() columns!: WGOPropToEdit[];
  @Prop() headerButtons!: {
    icon: string;
    tooltip: string;
    click: () => unknown;
  }[];
  @Prop() editAccounting!: (acc: AccountRecord) => unknown;
  @Prop() confirmAccounting!: (acc: AccountRecord) => unknown;
  @Prop() cancelAccounting!: (acc: AccountRecord) => unknown;
  @Prop() sendAccounting!: (acc: AccountRecord) => unknown;
  @Prop() previewAccounting!: (acc: AccountRecord) => unknown;
  @Prop() exportAccounting!: (acc: AccountRecord) => unknown;

  @Getter(componentsGettedKeys.getLeftDrawerOpen, {
    namespace: componentsNamespace
  })
  show!: boolean;
  @Getter(componentsGettedKeys.getLeftDrawerMinState, {
    namespace: componentsNamespace
  })
  minState!: boolean;

  watchProps = {
    show: false,
    minState: false
  };

  pageAccounting: AccountRecord[] = [];
  innerLoading = false;
  maxPage = 0;
  currentPage = 1;
  itemsByPage = 10;
  itemsCount = 0;

  editAccountingBtn: WGOExpandableButton = {
    click: (item?: WGOListItem) => {
      this.onEditAccounting((item as any) as AccountRecord);
    },
    icon: 'edit',
    tooltip: 'Edit',
    disabled: (item?: WGOListItem) => {
      if (!item) return true;
      const itemAcc = (item as any) as AccountRecord;
      return !this.isAdminUser();
    }
  };

  confirmAccoutingBtn: WGOExpandableButton = {
    click: (item?: WGOListItem) => {
      this.onConfirmAccounting((item as any) as AccountRecord);
    },
    icon: 'check_circle',
    tooltip: 'Confirm',
    disabled: (item?: WGOListItem) => {
      if (!item) return true;
      const itemAcc = (item as any) as AccountRecord;
      return !this.isAdminUser() || itemAcc.status !== 1;
    }
  };

  cancelAccountingBtn: WGOExpandableButton = {
    click: (item?: WGOListItem) => {
      this.onCancelAccounting((item as any) as AccountRecord);
    },
    icon: 'cancel',
    tooltip: 'Cancel',
    disabled: (item?: WGOListItem) => {
      if (!item) return true;
      const itemAcc = (item as any) as AccountRecord;
      return !this.isAdminUser() || itemAcc.status !== 1;
    }
  };

  sendAccountingBtn: WGOExpandableButton = {
    click: (item?: WGOListItem) => {
      this.onSendAccounting((item as any) as AccountRecord);
    },
    icon: 'send',
    tooltip: 'Send accounting',
    disabled: (item?: WGOListItem) => {
      if (!item) return true;
      const itemAcc = (item as any) as AccountRecord;
      return itemAcc.status !== 2;
    }
  };

  previewAccountingBtn: WGOExpandableButton = {
    click: (item?: WGOListItem) => {
      this.onPreviewAccounting((item as any) as AccountRecord);
    },
    icon: 'visibility',
    tooltip: 'Preview'
  };
  exportAccountingBtn: WGOExpandableButton = {
    click: (item?: WGOListItem) => {
      this.onExportAccounting((item as any) as AccountRecord);
    },
    icon: 'print',
    tooltip: 'Export'
  };

  itemByPageOptions = [5, 10, 20, 50, 100];
  options = <WGOExpandableListOptions>{
    showAddButton: false,
    expandedButtons: [
      this.editAccountingBtn,
      this.confirmAccoutingBtn,
      this.cancelAccountingBtn,
      this.sendAccountingBtn,
      this.previewAccountingBtn,
      this.exportAccountingBtn
    ],
    labelShowAddButton: '',
    textDeleteConfirm: '',
    disableFilters: true,
    onAddItem: () => null,
    onDeleteItem: () => null,
    onEditItem: () => null,
    headerButtons: this.headerButtons
  };

  /**
   *
   */
  constructor() {
    super();
    this.$nextTick(() => this.updatePageCollaborators());
  }

  @Watch('show')
  @Watch('minState')
  changeWatchProps() {
    this.watchProps = {
      show: this.show,
      minState: this.minState
    };
  }

  @Watch('accountings')
  @Watch('currentPage')
  @Watch('itemsByPage')
  updatePageCollaborators() {
    const startIndex = (this.currentPage - 1) * this.itemsByPage;
    this.pageAccounting = (this.accountings || []).slice(
      startIndex,
      startIndex + this.itemsByPage
    );
    this.itemsCount = (this.accountings || []).length;
    this.maxPage =
      Math.floor(this.itemsCount / this.itemsByPage) +
      (this.itemsCount % this.itemsByPage > 0 ? 1 : 0);
  }

  @Watch('translationContent')
  updateTranslations() {
    this.editAccountingBtn.tooltip = this.translationContent.WGO_FINANCE_ACCOUNTING_EDIT_BTN;
    this.confirmAccoutingBtn.tooltip = this.translationContent.WGO_FINANCE_ACCOUNTING_CONFIRM_BTN;
    this.cancelAccountingBtn.tooltip = this.translationContent.WGO_FINANCE_ACCOUNTING_CANCEL_BTN;
    this.sendAccountingBtn.tooltip = this.translationContent.WGO_FINANCE_ACCOUNTING_SEND_BTN;
    this.previewAccountingBtn.tooltip = this.translationContent.WGO_FINANCE_ACCOUNTING_PREVIEW_BTN;
    this.exportAccountingBtn.tooltip = this.translationContent.WGO_FINANCE_ACCOUNTING_EXPORT_BTN;
  }

  onEditAccounting(record: AccountRecord) {
    if (this.editAccounting) {
      this.editAccounting(record);
    }
  }
  onConfirmAccounting(record: AccountRecord) {
    if (this.confirmAccounting) {
      this.confirmAccounting(record);
    }
  }
  onCancelAccounting(record: AccountRecord) {
    if (this.cancelAccounting) {
      this.cancelAccounting(record);
    }
  }
  onSendAccounting(record: AccountRecord) {
    if (this.sendAccounting) {
      this.sendAccounting(record);
    }
  }
  onPreviewAccounting(record: AccountRecord) {
    if (this.previewAccounting) {
      this.previewAccounting(record);
    }
  }
  onExportAccounting(record: AccountRecord) {
    if (this.exportAccounting) {
      this.exportAccounting(record);
    }
  }

  isAdminUser() {
    return this.userLogged && this.userLogged.isAdmin;
  }

  async mounted() {
    this.innerLoading = true;
    await this.registerTranslations(TranslationsKeys);
    this.updateTranslations();
    this.innerLoading = false;
  }
}
