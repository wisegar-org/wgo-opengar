import { AccountRecord } from 'src/modules/finance';
import {
  ExpandableButton,
  ExpandableListOptions,
  ListItem,
  PropToEdit
} from 'src/modules/wgo/components/ExpandableList/models';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { TranslationsKeys } from '../TranslationsKeys';
import ExpandableList from 'src/modules/wgo/components/ExpandableList/ExpandableList.vue';
import AccountingDetails from '../AccountingDetailsDialog/AccountingDetails.vue';
import { ApiSettings } from '../../../settings/ApiSettings';
import { UserLogged } from 'src/modules/wgo/models';

@Component({
  components: {
    ExpandableList,
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
  @Prop() columns!: PropToEdit[];
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

  pageAccounting: AccountRecord[] = [];
  innerLoading = false;
  maxPage = 0;
  currentPage = 1;
  itemsByPage = 10;
  itemsCount = 0;

  editAccountingBtn: ExpandableButton = {
    click: (item?: ListItem) => {
      this.onEditAccounting((item as any) as AccountRecord);
    },
    icon: 'edit',
    tooltip: 'Edit',
    disabled: (item?: ListItem) => {
      if (!item) return true;
      const itemAcc = (item as any) as AccountRecord;
      return !this.isAdminUser();
    }
  };

  confirmAccoutingBtn: ExpandableButton = {
    click: (item?: ListItem) => {
      this.onConfirmAccounting((item as any) as AccountRecord);
    },
    icon: 'check_circle',
    tooltip: 'Confirm',
    disabled: (item?: ListItem) => {
      if (!item) return true;
      const itemAcc = (item as any) as AccountRecord;
      return !this.isAdminUser() || itemAcc.status !== 1;
    }
  };

  cancelAccountingBtn: ExpandableButton = {
    click: (item?: ListItem) => {
      this.onCancelAccounting((item as any) as AccountRecord);
    },
    icon: 'cancel',
    tooltip: 'Cancel',
    disabled: (item?: ListItem) => {
      if (!item) return true;
      const itemAcc = (item as any) as AccountRecord;
      return !this.isAdminUser() || itemAcc.status !== 1;
    }
  };

  sendAccountingBtn: ExpandableButton = {
    click: (item?: ListItem) => {
      this.onSendAccounting((item as any) as AccountRecord);
    },
    icon: 'send',
    tooltip: 'Send accounting',
    disabled: (item?: ListItem) => {
      if (!item) return true;
      const itemAcc = (item as any) as AccountRecord;
      return itemAcc.status !== 2;
    }
  };

  previewAccountingBtn: ExpandableButton = {
    click: (item?: ListItem) => {
      this.onPreviewAccounting((item as any) as AccountRecord);
    },
    icon: 'visibility',
    tooltip: 'Preview'
  };

  itemByPageOptions = [5, 10, 20, 50, 100];
  options = <ExpandableListOptions>{
    showAddBotton: false,
    expandedButtons: [
      this.editAccountingBtn,
      this.confirmAccoutingBtn,
      this.cancelAccountingBtn,
      this.sendAccountingBtn,
      this.previewAccountingBtn
    ],
    labelShowAddBotton: '',
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
    this.editAccountingBtn.tooltip = this.translationContent.WGO_FINANCE_COLLABORATOR_EDIT_CONTACT_BTN;
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

  isAdminUser() {
    return this.userLogged && this.userLogged.isSuperAdmin;
  }

  async mounted() {
    this.innerLoading = true;
    await this.registerTranslations(TranslationsKeys);
    this.updateTranslations();
    this.innerLoading = false;
  }
}
