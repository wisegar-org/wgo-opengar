import { UsersModel } from './../../models/models';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { ColumnsUsers, setColumnsLanguage } from './ColumnsUsers';
import UserUpdateDialog from './UserUpdateDialog.vue';
import { userActions, userGetters, userNamespace } from '../../store/User';
import {
  componentsActionsKeys,
  componentsNamespace
} from 'src/modules/wgo/store/ComponentsState';
import { INotify } from 'src/modules/wgo/models';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../../store/Language';
import { ITranslationUserKeys, TranslationsKeys } from './TranslationsKeys';
import UserExpanded from './UserExpanded.vue';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog.vue';

@Component({
  components: {
    UserUpdateDialog,
    UserExpanded,
    ConfirmDialog
  }
})
export default class UserListComponent extends Vue {
  @Action(userActions.allUsers, { namespace: userNamespace })
  loadData!: () => Promise<UsersModel[]>;

  @Action(userActions.deleteUser, { namespace: userNamespace })
  deleteUserAction!: (user: UsersModel) => Promise<boolean>;

  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationUserKeys;

  loading = true;
  confirm = false;
  innerLoading = true;

  maxPage = 0;
  currentPage = 1;
  pageItems = 5;

  usersCount = 0;

  search = '';

  showUpdateModal = false;
  userSelected: UsersModel | null = null;

  @Getter(userGetters.getUsers, { namespace: userNamespace })
  usersList!: UsersModel[];

  usersListFinal!: UsersModel[];

  columns = ColumnsUsers;

  constructor() {
    super();
  }

  async mounted() {
    await this.registerTranslations(TranslationsKeys);
    await this.loadData();
    this.editSearch();
    this.loading = false;
    this.innerLoading = false;
  }

  updateUser(row: UsersModel | null) {
    this.userSelected = row;
    this.showUpdateModal = true;
  }

  confirmDeleteUser(row: UsersModel | null) {
    this.userSelected = row;
    this.confirm = true;
  }

  async deleteUser() {
    if (this.userSelected != null) {
      const response = await this.deleteUserAction(this.userSelected);
      if (response) {
        this.notify({
          message: 'User deleted successfully',
          type: 'positive'
        });
      }
    }
    this.confirm = false;
  }

  @Watch('translationContent')
  setColumnsLabels() {
    setColumnsLanguage(this.translationContent);
  }

  @Watch('search')
  editSearch() {
    this.loading = true;
    this.currentPage = 1;
    this.usersListFinal = this.usersList.slice(0, this.pageItems);
    this.usersCount = this.usersList.length;
    this.maxPage =
      Math.floor(this.usersCount / this.pageItems) +
      (this.usersCount % this.pageItems > 0 ? 1 : 0);
    this.loading = false;
  }

  @Watch('currentPage')
  @Watch('usersList')
  @Watch('usersList.length')
  changePage() {
    this.loading = true;
    const index = (this.currentPage - 1) * this.pageItems;
    this.usersListFinal = this.usersList.slice(index, index + this.pageItems);
    this.loading = false;
  }

  // @Watch('usersList')
  // reloadUsers() {
  //   this.loading = true;
  //   this.usersListFinal = this.usersList.slice(this.currentPage, this.currentPage + this.pageItems);
  //   this.loading = false;
  // }
}
