<template>
  <div class="row flex q-ma-sm">
    <div class="col-12 ">
      <q-input
        square
        outlined
        class="q-ma-sm"
        :value="`${issue.number} - ${issue.title}`"
        :label="translationContent.WGO_FINANCE_ISSUES_COLUMN_TITLE"
        autogrow
        dense
        readonly
      />
    </div>
    <div class="col-12">
      <q-input
        square
        outlined
        class="q-ma-sm"
        :value="issue.description"
        :label="translationContent.WGO_FINANCE_ISSUES_COLUMN_DESCRIPTION"
        autogrow
        dense
        readonly
      />
    </div>
    <div class="col-12 col-sm-6">
      <q-input
        square
        outlined
        class="q-ma-sm"
        :value="getCollaborator()"
        :label="translationContent.WGO_FINANCE_ISSUES_COLUMN_ASSIGNED_TO"
        dense
        readonly
      />
    </div>
    <div class="col-12 col-sm-6">
      <q-input
        square
        outlined
        class="q-ma-sm"
        :value="getRepository()"
        :label="translationContent.WGO_FINANCE_ISSUES_COLUMN_REPOSITORY"
        dense
        readonly
      />
    </div>
    <div class="col-12 col-sm-6">
      <q-input
        square
        outlined
        class="q-ma-sm"
        :value="issue.hours"
        :label="translationContent.WGO_FINANCE_ISSUES_COLUMN_HOURS"
        dense
        readonly
      />
    </div>
    <div class="col-12 col-sm-6">
      <q-input
        square
        outlined
        class="q-ma-sm"
        :value="issue.last_comment"
        autogrow
        :label="translationContent.WGO_FINANCE_ISSUES_COLUMN_LAST_COMMENT"
        dense
        readonly
      />
    </div>
    <div class="col-12 col-sm-6">
      <q-input
        square
        outlined
        class="q-ma-sm"
        :value="getFormatDate(issue.created_at)"
        :label="translationContent.WGO_FINANCE_ISSUES_COLUMN_CREATED_AT"
        dense
        readonly
      />
    </div>
    <div class="col-12 col-sm-6">
      <q-input
        square
        outlined
        class="q-ma-sm"
        :value="getFormatDate(issue.closed_at)"
        :label="translationContent.WGO_FINANCE_ISSUES_COLUMN_CLOSED_AT"
        dense
        readonly
      />
    </div>
    <q-card-actions v-if="!!close" align="right" class="text-primary fit">
      <q-btn
        unelevated
        @click="() => goToGithub()"
        color="primary"
        :label="translationContent.WGO_FINANCE_ISSUES_GO_TO_GITHUB_BTN"
      />
      <q-btn
        unelevated
        @click="() => closeDialog()"
        color="primary"
        align="around"
        class="btn-fixed-width btn_width"
        :label="translationContent.WGO_CLOSE_BTN"
      />
    </q-card-actions>
  </div>
</template>

<script lang="ts">
import { IssuesRecord } from '../../../models/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import moment from 'moment';
import { openURL } from 'quasar';
import {
  languageGetters,
  languageNamespace
} from '../../../../wgo/store/Language';
import { Getter } from 'vuex-class';
import { ITranslationFinanceIssuesKeys } from '../TranslationsKeys';

@Component({})
export default class IssueDetails extends Vue {
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationFinanceIssuesKeys;
  @Prop() issue!: IssuesRecord;
  @Prop() close!: () => void;

  getRepository() {
    return this.issue && this.issue.repository && this.issue.repository.title
      ? this.issue.repository.title
      : '-';
  }
  getCollaborator() {
    return this.issue && this.issue.assignedTo && this.issue.assignedTo.login
      ? this.issue.assignedTo.login
      : '-';
  }
  closeDialog() {
    this.close();
  }

  goToGithub() {
    openURL(this.issue.url.replace('api.github.com/repos', 'github.com'));
  }

  getFormatDate(date: string) {
    return moment(date).format('YYYY-MM-DD');
  }
}
</script>
