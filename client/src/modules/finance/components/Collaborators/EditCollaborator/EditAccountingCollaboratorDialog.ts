import { CollaboratorRecord } from '@wisegar-org/wgo-base-models/build/models';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';
import { githubActions, githubNamespace } from '../../../store';
import { ApiSettings } from '../../../settings/ApiSettings';
import { INotify, UserLogged } from '../../../../wgo/models';
import {
  componentsActionsKeys,
  componentsNamespace,
} from '../../../../wgo/store/ComponentsState';
import { Action, Getter } from 'vuex-class';
import {
  ITranslationFinanceCollaboratorKeys,
  WGO_FINANCE_COLLABORATOR_ROLE_CLIENT,
  WGO_FINANCE_COLLABORATOR_ROLE_COLLABORATOR,
  WGO_FINANCE_COLLABORATOR_ROLE_PROVIDER,
} from '../TranslationsKeys';
import {
  languageGetters,
  languageNamespace,
} from 'src/modules/wgo/store/Language';
import {
  clientRoleType,
  collaboratorRoleType,
  providerRoleType,
} from '../ColumnsCollaborators';

@Component({
  components: {
    Dialog,
  },
})
export default class EditAccountingCollaboratorDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() collaborator!: CollaboratorRecord;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationFinanceCollaboratorKeys;
  @Action(githubActions.updateCollAccountingProps, {
    namespace: githubNamespace,
  })
  updateProperties!: (item: CollaboratorRecord) => Promise<boolean>;
  @Action(githubActions.addClientProvider, {
    namespace: githubNamespace,
  })
  createClientProvider!: (item: CollaboratorRecord) => Promise<boolean>;
  @Action(ApiSettings.USER_LOGGED_ACTION, {
    namespace: ApiSettings.USER_NAMESPACE,
  })
  loadLoggedUser!: () => Promise<void>;
  @Getter(ApiSettings.USER_LOGGED_GETTER, {
    namespace: ApiSettings.USER_NAMESPACE,
  })
  loggedUser!: UserLogged;

  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;
  showLoading = false;

  editProps: {
    name: string;
    login: string;
    card_number: string;
    pay_by_hours: string;
    // pay_to_internet: string;
    email: string;
    address: string;
    cap: string;
    place: string;
    description: string;
    type: string;
  };

  optionsRoles = [collaboratorRoleType, clientRoleType, providerRoleType];

  selectedRoles: (string | { value: string; label?: string })[] = [];

  constructor() {
    super();
    this.selectedRoles = [];
    this.editProps = {
      name: '',
      login: '',
      card_number: '',
      email: '',
      address: '',
      pay_by_hours: '',
      cap: '',
      place: '',
      // pay_to_internet: '',
      description: '',
      type: '',
    };
    this.updatePropsEditor();
  }

  @Watch('collaborator')
  updatePropsEditor() {
    this.editProps = this.collaborator
      ? {
          name: `${this.collaborator.name || this.collaborator.login}`,
          login: `${this.collaborator.login}`,
          card_number: `${this.collaborator.card_number || ''}`,
          pay_by_hours: `${this.collaborator.pay_by_hours || ''}`,
          // pay_to_internet: `${this.collaborator.pay_to_internet || ''}`,
          email: `${this.collaborator.email || ''}`,
          address: `${this.collaborator.address || ''}`,
          cap: `${this.collaborator.cap || ''}`,
          place: `${this.collaborator.place || ''}`,
          description: `${this.collaborator.bio || ''}`,
          type: `${this.collaborator.type}`,
        }
      : {
          name: '',
          login: '',
          card_number: '',
          email: '',
          address: '',
          pay_by_hours: '',
          cap: '',
          place: '',
          // pay_to_internet: '',
          description: '',
          type: '',
        };

    this.selectedRoles = this.editProps.type
      .split(',')
      .filter((role) => this.isValidRole(role))
      .map((item) => ({
        value: item,
        label:
          item in this.translationContent
            ? (this.translationContent as any)[item]
            : item,
      }));
  }

  @Watch('selectedRoles')
  updateTypeRoles() {
    this.editProps.type = (this.selectedRoles || [])
      .map((item) => (typeof item === 'string' ? item : item.value))
      .join(',');
  }

  isValidRole(role: string) {
    return (
      role === WGO_FINANCE_COLLABORATOR_ROLE_PROVIDER ||
      role === WGO_FINANCE_COLLABORATOR_ROLE_COLLABORATOR ||
      role === WGO_FINANCE_COLLABORATOR_ROLE_CLIENT
    );
  }

  isValid() {
    return (
      !!this.editProps.name &&
      !!this.editProps.type &&
      ((!!this.loggedUser && this.loggedUser.isAdmin) ||
        (!!this.editProps.card_number &&
          !!this.editProps.pay_by_hours &&
          !!this.editProps.email &&
          !!this.editProps.cap &&
          !!this.editProps.place &&
          !!this.editProps.address))
    );
  }

  isCollaborator() {
    return (
      this.editProps.type.indexOf(
        WGO_FINANCE_COLLABORATOR_ROLE_COLLABORATOR
      ) !== -1
    );
  }

  @Watch('translationContent')
  updateRolesLabel() {
    collaboratorRoleType.label =
      this.translationContent.WGO_FINANCE_COLLABORATOR_ROLE_COLLABORATOR ||
      'Collaborator';
    clientRoleType.label =
      this.translationContent.WGO_FINANCE_COLLABORATOR_ROLE_CLIENT || 'Client';
    providerRoleType.label =
      this.translationContent.WGO_FINANCE_COLLABORATOR_ROLE_PROVIDER ||
      'Provider';

    this.selectedRoles = this.editProps.type.split(',').map((item) => ({
      value: item,
      label: (this.translationContent as any)[item] || item,
    }));
  }

  async updateProps() {
    this.showLoading = true;
    const result = this.collaborator
      ? await this.updateProperties(<CollaboratorRecord>{
          id: this.collaborator.id,
          name: this.editProps.name,
          card_number: this.editProps.card_number,
          pay_by_hours: parseFloat(this.editProps.pay_by_hours),
          // pay_to_internet: parseFloat(this.editProps.pay_to_internet),
          email: this.editProps.email,
          bio: this.editProps.description,
          address: this.editProps.address,
          cap: this.editProps.cap,
          place: this.editProps.place,
          type: this.editProps.type,
        })
      : await this.createClientProvider(<CollaboratorRecord>{
          name: this.editProps.name,
          login: this.editProps.name,
          bio: this.editProps.description,
          pay_by_hours: parseFloat(this.editProps.pay_by_hours),
          email: this.editProps.email,
          card_number: this.editProps.card_number,
          address: this.editProps.address,
          cap: this.editProps.cap,
          place: this.editProps.place,
          type: this.editProps.type,
        });

    if (result) {
      this.notify({
        message: `Collaborator ${
          this.collaborator ? 'updated' : 'created'
        } successfully`,
        type: 'positive',
      });
      if (
        this.collaborator &&
        this.loggedUser.userName === this.collaborator.login
      ) {
        await this.loadLoggedUser();
      }
      this.close();
    }
    this.showLoading = false;
  }

  onClose() {
    if (this.close) {
      this.close();
    }
  }

  getTitle() {
    return !this.collaborator
      ? this.translationContent.WGO_FINANCE_COLLABORATOR_CREATE_TITLE ||
          'Create contact'
      : this.translationContent.WGO_FINANCE_COLLABORATOR_EDIT_TITLE ||
          'Edit contact';
  }
}
