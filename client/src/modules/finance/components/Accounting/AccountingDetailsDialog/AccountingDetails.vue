<template>
  <div class="row q-col-gutter-none" style="width: 100%">
    <div class="col-12 col-md-4">
      <q-input
        :value="accounting.contributor.login"
        outlined
        readonly
        class="q-ma-md"
        label="Accounted to"
        dense
        autogrow
        stacked-label
      >
        <template v-slot:prepend>
          <q-avatar>
            <img :src="accounting.contributor.avatar_url" />
          </q-avatar>
        </template>
      </q-input>
    </div>
    <div class="col-12 col-md-4">
      <q-input
        square
        outlined
        dense
        class="q-ma-md"
        :value="accounting.contributor.name"
        label="Name"
        autogrow
        readonly
      />
    </div>
    <div class="col-12 col-md-4">
      <q-input
        square
        outlined
        dense
        class="q-ma-md"
        :value="accounting.contributor.address"
        label="Address"
        autogrow
        readonly
      />
    </div>
    <div class="col-12 col-md-4">
      <q-input
        square
        outlined
        dense
        class="q-ma-md"
        :value="accounting.contributor.card_number"
        label="Card number"
        autogrow
        readonly
      />
    </div>
    <div class="col-12 col-md-4">
      <q-input
        square
        outlined
        dense
        class="q-ma-md"
        :value="accounting.pay_by_hours"
        label="Pay by hours"
        autogrow
        readonly
      />
    </div>
    <!-- <div class="col-12 col-md-4">
      <q-input
        square
        outlined
        dense
        class="q-ma-md"
        :value="accounting.pay_to_internet"
        label="Pay to internet"
        autogrow
        readonly
      />
    </div> -->
    <div class="col-12 col-md-4">
      <q-input
        square
        outlined
        dense
        class="q-ma-md"
        :value="`${accounting.value} (${accounting.value + accounting.taxes})`"
        label="Total to pay"
        autogrow
        readonly
      />
    </div>
    <div class="col-12 col-md-4">
      <q-input
        square
        outlined
        dense
        class="q-ma-md"
        :value="getFormatDate(accounting.date.toString())"
        label="Date"
        autogrow
        readonly
      />
    </div>
    <div class="col-12 col-md-4">
      <q-input
        square
        outlined
        dense
        class="q-ma-md"
        :value="getReposAccounting()"
        label="Repositories"
        autogrow
        readonly
      />
    </div>
    <div class="col-12 col-md-4">
      <q-input
        square
        outlined
        dense
        class="q-ma-md"
        :value="accounting.taxes"
        label="Taxes"
        autogrow
        readonly
      />
    </div>
    <div class="col-12 col-md-4">
      <q-input
        :value="accounting.initDate"
        readonly
        outlined
        class="q-ma-md"
        label="Init date"
        mask="date"
        dense
        stacked-label
      />
    </div>
    <div class="col-12 col-md-4">
      <q-input
        :value="accounting.endDate"
        readonly
        outlined
        class="q-ma-md"
        label="End date"
        mask="date"
        dense
        stacked-label
      />
    </div>

    <SimpleViewIssues :issues="issues" title="Accounted issues" />
    <div v-if="accounting.details" class="col-12 q-pa-md">
      <VisorEditor label="Observations" :text="accounting.details" />
    </div>
    <div v-if="accounting.payment_comment" class="col-12 q-pa-md">
      <VisorEditor
        label="Payment comment"
        :text="accounting.payment_comment || ''"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  AccountRecord,
  IssuesRecord,
  OptionFilter
} from '../../../models/models';
import { Vue, Component, Prop } from 'vue-property-decorator';
import moment from 'moment';
import { Action } from 'vuex-class';
import { githubActions, githubNamespace } from '../../../store';
import SimpleViewIssues from '../../Issues/SimpleViewIssues/SimpleViewIssues.vue';
import VisorEditor from '../../VisorEditor.vue';

@Component({
  components: {
    SimpleViewIssues,
    VisorEditor
  }
})
export default class AccountingDetails extends Vue {
  @Prop() accounting!: AccountRecord;
  @Action(githubActions.getIssuessByAccount, { namespace: githubNamespace })
  loadIssues!: (id: number) => Promise<IssuesRecord[]>;
  issues: IssuesRecord[] = [];

  getReposAccounting() {
    return this.accounting.repos
      ? this.accounting.repos
          .map((record: OptionFilter) => record.title)
          .join(', ')
      : '';
  }

  getFormatDate(date: string) {
    return moment(date).format('YYYY-MM-DD');
  }

  async mounted() {
    this.issues = await this.loadIssues(this.accounting.id);
  }
}
</script>
