import { UsersModel, RolModel, UsersSendModel } from './../../models/models';
import { Action, Getter } from 'vuex-class';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { QPopupProxy } from 'quasar';
import { userActions, userGetters, userNamespace } from '../../store/User';
import {
  componentsActionsKeys,
  componentsNamespace
} from 'src/modules/wgo/store/ComponentsState';
import { INotify } from 'src/modules/wgo/models';
import { languageGetters, languageNamespace } from '../../store/Language';
import { ITranslationUserKeys } from './TranslationsKeys';

@Component({
  components: {}
})
export default class UserUpdateComponent extends Vue {
  @Prop() userModel!: UsersModel;
  @Prop() close!: () => void;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationUserKeys;

  @Action(userActions.updateUserAdmin, {
    namespace: userNamespace
  })
  updateUser!: (item: UsersSendModel) => Promise<boolean>;

  @Action(userActions.createUser, {
    namespace: userNamespace
  })
  createUser!: (user: UsersSendModel) => Promise<boolean>;

  @Getter(userGetters.getRoles, { namespace: userNamespace })
  rolesList!: RolModel[];

  @Action(userActions.allRoles, { namespace: userNamespace })
  loadData!: () => Promise<RolModel[]>;

  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  editProps: UsersModel;
  confirmPassword: string;
  isPwd: boolean;
  emailError: boolean;

  constructor() {
    super();
    this.editProps = {
      id: this.userModel ? this.userModel.id : 0,
      uuid: this.userModel ? this.userModel.uuid : '',
      email: this.userModel ? this.userModel.email : '',
      name: this.userModel ? this.userModel.name : '',
      lastName: this.userModel ? this.userModel.lastName : '',
      userName: this.userModel ? this.userModel.userName : '',
      isEmailConfirmed: this.userModel
        ? this.userModel.isEmailConfirmed
        : false,
      roles: this.userModel ? this.userModel.roles : [],
      password: this.userModel ? this.userModel.password : ''
    };
    this.confirmPassword = '';
    this.isPwd = true;
    this.emailError = false;
  }

  async mounted() {
    await this.loadData();
  }

  isValidPassword() {
    return !this.userModel
      ? this.editProps.password &&
          this.editProps.password == this.confirmPassword &&
          this.isSecurePassword(this.editProps.password) == true
      : true;
  }

  isSecurePassword(val: string) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\.@$!%*?&\+\-])[A-Za-z\d@$!%*?&\.\+\-]{8,}$/;
    return (
      passwordPattern.test(val) ||
      this.translationContent.WGO_USERS_ERROR_PASSWORD_STRENGTH
    );
  }

  isValid() {
    return (
      this.editProps.userName &&
      this.editProps.email &&
      this.editProps.name &&
      this.editProps.lastName &&
      this.isValidPassword() &&
      this.isValidEmail(this.editProps.email) == true &&
      this.editProps.roles.length > 0
    );
  }

  isValidEmail(val: string) {
    const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val) || 'Invalid email';
  }

  closePopUp(popup: unknown) {
    (popup as QPopupProxy).hide();
  }

  async submitUser() {
    this.showLoading(true);
    const rolesIds: number[] = [];
    for (const { id } of this.editProps.roles) {
      rolesIds.push(id);
    }

    const sendModel = {
      id: this.editProps.id,
      email: this.editProps.email,
      isEmailConfirmed: this.editProps.isEmailConfirmed,
      lastName: this.editProps.lastName,
      name: this.editProps.name,
      password: this.editProps.password,
      roles: rolesIds,
      userName: this.editProps.userName,
      uuid: this.editProps.uuid
    };

    const result = this.userModel
      ? await this.updateUser(sendModel)
      : await this.createUser(sendModel);

    if (result) {
      this.notify({
        message: this.userModel
          ? this.translationContent.WGO_USERS_SUCCESS_EDIT_ACTION
          : this.translationContent.WGO_USERS_SUCCESS_CREATE_ACTION,
        type: 'positive'
      });
      this.close();
    } else {
      this.notify({
        message: 'Error on created!',
        type: 'negative'
      });
    }
    this.showLoading(false);
  }
}
