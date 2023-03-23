import {
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';
import { ITranslationFinanceCollaboratorKeys } from '../TranslationsKeys';
import InputText from 'src/modules/wgo/components/InputText/InputText.vue';
import InputSelect from 'src/modules/wgo/components/InputSelect/InputSelect.vue';
import { IFilterCollaborator } from '../FilterCollaborator';
import { IInputSelectableOptions } from 'src/modules/wgo/models/IInputOptions';
import {
  clientRoleType,
  collaboratorRoleType,
  providerRoleType
} from '../ColumnsCollaborators';

@Component({
  components: {
    Dialog,
    InputText,
    InputSelect
  }
})
export default class CollaboratorsFilterDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() title!: string;
  @Prop() filters!: IFilterCollaborator;
  @Prop({ default: () => {} }) close!: () => unknown;
  @Prop({ default: () => {} }) applyFilter!: (
    filter: IFilterCollaborator
  ) => unknown;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationFinanceCollaboratorKeys;
  selectedRole: string;

  showLoading = false;
  filtersEdit: IFilterCollaborator;

  optionsSelect: IInputSelectableOptions[] = [
    collaboratorRoleType,
    clientRoleType,
    providerRoleType
  ];
  /**
   *
   */
  constructor() {
    super();
    this.filtersEdit = this.filters
      ? { ...this.filters }
      : <IFilterCollaborator>{};
    this.selectedRole = this.filtersEdit.type || '';
  }

  getTitle() {
    return this.title
      ? this.title
      : this.translationContent.WGO_FINANCE_COLLABORATOR_FILTER_TITLE ||
          'Filter';
  }

  onResetFilter() {
    this.filtersEdit = <IFilterCollaborator>{};
  }
  onApplyFilter() {
    if (this.applyFilter) this.applyFilter(this.filtersEdit);
    if (this.close) this.close();
  }

  @Watch('filters')
  onFilterChange() {
    this.filtersEdit = this.filters
      ? { ...this.filters }
      : <IFilterCollaborator>{};
    this.selectedRole = this.filtersEdit.type || '';
  }

  @Watch('selectedRole')
  changeSelectedRole() {
    this.filtersEdit.type = this.selectedRole
      ? (this.selectedRole as any).value
      : '';
  }

  onClose() {
    if (this.close) this.close();
  }
}
