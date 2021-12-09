<template>
  <div class="row flex q-ma-sm">
    <div class="col-12 ">
      <q-input
        square
        outlined
        class="q-ma-sm"
        :value="`${issue.number} - ${issue.title}`"
        label="Title"
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
        label="Description"
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
        label="Assigned to"
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
        label="Repository"
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
        label="Hours"
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
        label="Last comment"
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
        label="Created at"
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
        label="Closed at"
        dense
        readonly
      />
    </div>
    <q-card-actions align="right" class="text-primary fit">
      <q-btn
        unelevated
        @click="() => goToGithub()"
        color="primary"
        label="Go to Github"
      />
      <q-btn
        unelevated
        v-if="!!close"
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
