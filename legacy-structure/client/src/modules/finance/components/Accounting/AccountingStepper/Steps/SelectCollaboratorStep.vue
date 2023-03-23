<template>
  <FilterSelect
    outlined
    lazy-rules
    filterProp="login"
    :options="collaborators"
    :value="value"
    @onChange="(value) => (selectedUser = value)"
    :rules="[validationRules]"
    :label="
      translationContent.WGO_FINANCE_ACCOUNTING_STEP_SELECT_COLLABORATOR_LABEL
    "
  />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { githubGetters, githubNamespace } from '../../../../store';
import { Dictionary } from '@wisegar-org/wgo-base-models/build/models';
import FilterSelect from '../../../FilterSelect.vue';
import {
  languageGetters,
  languageNamespace,
} from '../../../../../wgo/store/Language';
import { ITranslationFinanceAccountingKeys } from '../../TranslationsKeys';

@Component({
  components: {
    FilterSelect,
  },
})
export default class SelectCollaboratorStep extends Vue {
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationFinanceAccountingKeys;
  @Getter(githubGetters.getCollaborators, { namespace: githubNamespace })
  collaborators!: Dictionary[];
  @Prop() value?: Dictionary;

  private selectedUser: Dictionary | null;
  private isValidForm: boolean;

  constructor() {
    super();
    this.selectedUser = this.value || null;
    this.isValidForm = false;
  }

  isUserValid() {
    return (
      this.collaborators.findIndex(
        (user) => this.selectedUser && user.login === this.selectedUser.login
      ) === -1
    );
  }

  validationRules() {
    return this.isUserValid() || 'Utente non valido';
  }

  @Watch('selectedUser')
  @Emit('change')
  change() {
    return this.selectedUser;
  }

  @Watch('selectedUser')
  @Emit('error')
  validationChange() {
    this.validationRules();
    return this.isValidForm;
  }
}
</script>
