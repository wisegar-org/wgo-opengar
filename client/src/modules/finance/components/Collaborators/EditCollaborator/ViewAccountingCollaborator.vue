<template>
  <div class="row q-pa-sm">
    <!-- <div
      v-if="collaborator && collaborator.isCollaborator"
      class="col-12 col-sm-6"
    >
      <q-input
        square
        outlined
        class="q-pa-sm"
        v-model="editProps.login"
        :autofocus="true"
        label="User name"
        dense
        readonly
      />
    </div> -->

    <div class="col-12 col-sm-6">
      <q-input
        square
        outlined
        class="q-pa-sm"
        v-model="editProps.name"
        :autofocus="true"
        :label="translationContent.WGO_FINANCE_COLLABORATOR_COLUMN_NAME"
        dense
        readonly
      />
    </div>

    <div
      v-if="!collaborator || !collaborator.isCollaborator"
      class="col-12 col-sm-6"
    >
      <q-input
        square
        outlined
        class="q-pa-sm"
        v-model="editProps.description"
        autogrow
        :autofocus="true"
        :label="translationContent.WGO_FINANCE_COLLABORATOR_COLUMN_DESCRIPTION"
        dense
        readonly
      />
    </div>

    <div class="col-12 col-sm-6">
      <q-input
        square
        outlined
        class="q-pa-sm"
        v-model="editProps.email"
        :label="translationContent.WGO_FINANCE_COLLABORATOR_COLUMN_EMAIL"
        dense
        readonly
      />
    </div>

    <div class="col-12 col-sm-6">
      <q-input
        square
        outlined
        class="q-pa-sm"
        v-model="editProps.address"
        :label="translationContent.WGO_FINANCE_COLLABORATOR_COLUMN_ADDRESS"
        dense
        readonly
      />
    </div>

    <div class="col-12 col-sm-6">
      <q-input
        square
        outlined
        class="q-pa-sm"
        type="number"
        v-model="editProps.cap"
        :label="translationContent.WGO_FINANCE_COLLABORATOR_COLUMN_CAP"
        dense
        readonly
      />
    </div>

    <div class="col-12 col-sm-6">
      <q-input
        square
        outlined
        class="q-pa-sm"
        v-model="editProps.place"
        :label="translationContent.WGO_FINANCE_COLLABORATOR_COLUMN_PLACE"
        dense
        readonly
      />
    </div>
    <div class="col-12 col-sm-6">
      <q-input
        square
        outlined
        class="q-pa-sm"
        v-model="editProps.typeTranslation"
        :label="translationContent.WGO_FINANCE_COLLABORATOR_COLUMN_ROLE"
        dense
        readonly
      />
    </div>

    <div class="col-12 col-sm-6">
      <q-input
        square
        outlined
        class="q-pa-sm"
        v-model="editProps.card_number"
        mask="#### - #### - #### - ####"
        dense
        :label="translationContent.WGO_FINANCE_COLLABORATOR_COLUMN_CARD_NUMBER"
        readonly
      />
    </div>

    <div
      v-if="collaborator && collaborator.isCollaborator"
      class="col-12 col-sm-6"
    >
      <q-input
        square
        outlined
        class="q-pa-sm"
        type="number"
        v-model="editProps.pay_by_hours"
        dense
        :label="translationContent.WGO_FINANCE_COLLABORATOR_COLUMN_PAY_BY_HOURS"
        readonly
      />
    </div>

    <div v-if="collaborator.isCollaborator" class="row col-12 justify-around">
      <q-btn
        unelevated
        color="primary"
        :label="translationContent.WGO_FINANCE_COLLABORATOR_GO_TO_GITHUB_BTN"
        icon="cached"
        @click="goToGithub"
        class="col-12 col-md-3 q-mt-sm"
      />
      <q-btn
        unelevated
        color="primary"
        :label="translationContent.WGO_FINANCE_COLLABORATOR_VIEW_STATS_BTN"
        icon="save"
        @click="() => (showStats = true)"
        class="col-12 col-md-3 q-mt-sm"
      />
    </div>

    <StatsCollaboratorDialog
      :collaborator="collaborator"
      :showModal="showStats"
      :close="() => (showStats = false)"
      :title="translationContent.WGO_FINANCE_COLLABORATOR_VIEW_STATS_TITLE"
    />
  </div>
</template>

<script lang="ts">
import { Action, Getter } from 'vuex-class';
import { CollaboratorRecord } from '../../../models/models';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { ApiSettings } from '../../../settings/ApiSettings';
import { INotify, UserLogged } from '../../../../wgo/models';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../../../wgo/store/ComponentsState';
import {
  languageGetters,
  languageNamespace
} from '../../../../wgo/store/Language';
import { ITranslationFinanceCollaboratorKeys } from '../TranslationsKeys';
import { openURL } from 'quasar';
import StatsCollaboratorDialog from '../StatsCollaborator/StatsCollaboratorDialog.vue';

@Component({
  components: {
    StatsCollaboratorDialog
  }
})
export default class ViewAccountingCollaborator extends Vue {
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationFinanceCollaboratorKeys;
  @Prop() collaborator!: CollaboratorRecord;
  @Getter(ApiSettings.USER_LOGGED_GETTER, {
    namespace: ApiSettings.USER_NAMESPACE
  })
  loggedUser!: UserLogged;

  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  showStats = false;
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
    typeTranslation: string;
  };

  constructor() {
    super();
    this.editProps = {
      name: '',
      login: '',
      card_number: '',
      email: '',
      address: '',
      pay_by_hours: '',
      cap: '',
      place: '',
      typeTranslation: '',
      // pay_to_internet: '',
      description: ''
    };

    this.$nextTick(() => {
      this.updateCollaborator();
    });
  }

  goToGithub() {
    if (this.collaborator.isCollaborator)
      openURL(`https://github.com/${this.collaborator.login}`);
  }

  @Watch('collaborator')
  updateCollaborator() {
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
          typeTranslation: `${this.collaborator.typeTranslation || ''}`,
          description: `${this.collaborator.bio || ''}`
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
          typeTranslation: '',
          // pay_to_internet: '',
          description: ''
        };
  }
}
</script>
