<template>
  <div>
    <q-input
      square
      outlined
      class="q-ma-lg"
      :value="`${issue.number} - ${issue.title}`"
      label="Title"
      autogrow
      dense
      readonly
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      :value="issue.description"
      label="Description"
      autogrow
      dense
      readonly
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      :value="getCollaborator()"
      label="Assigned to"
      dense
      readonly
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      :value="getRepository()"
      label="Repository"
      dense
      readonly
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      :value="issue.hours"
      label="Hours"
      dense
      readonly
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      :value="issue.last_comment"
      autogrow
      label="Last comment"
      dense
      readonly
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      :value="getFormatDate(issue.created_at)"
      label="Created at"
      dense
      readonly
    />
    <q-input
      square
      outlined
      class="q-ma-lg"
      :value="getFormatDate(issue.closed_at)"
      label="Closed at"
      dense
      readonly
    />
    <q-card-actions align="right" class="text-primary">
      <q-btn
        unelevated
        @click="() => goToGithub()"
        color="primary"
        label="Go to Github"
      />
      <q-btn
        unelevated
        @click="() => closeDialog()"
        color="primary"
        align="around"
        class="btn-fixed-width btn_width"
        label="Close"
      />
    </q-card-actions>
  </div>
</template>

<script lang="ts">
import { IssuesRecord } from '../../../models/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import moment from 'moment';
import { openURL } from 'quasar';

@Component({})
export default class IssueDetails extends Vue {
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
