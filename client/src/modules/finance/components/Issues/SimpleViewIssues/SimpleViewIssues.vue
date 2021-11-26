<template>
  <div class="q-pa-none" style="width: 100%">
    <q-table
      bordered
      flat
      title=""
      :data="issuesData"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top>
        <div class="row q-col-gutter-none justify-between" style="width: 100%">
          <div>
            {{ title }}
          </div>
          <div class="col-12 col-md-3">
            <q-input
              outlined
              readonly
              dense
              flat
              :value="getHourIssues()"
              type="number"
              prefix="Hours: "
            />
          </div>
        </div>
      </template>
      <template v-slot:loading>
        <Loader :loading="true" />
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { IssuesRecord } from '../../../models/models';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { SimpleColumnsIssues } from '../ColumnsIssues';

@Component({})
export default class SimpleViewIssues extends Vue {
  @Prop() issues!: IssuesRecord[];
  @Prop({ default: 'Issues' }) title!: string;
  columns = SimpleColumnsIssues;
  issuesData: IssuesRecord[];
  constructor() {
    super();
    this.issuesData = this.issues ? this.issues : [];
  }

  getHourIssues() {
    return this.issuesData
      .map(issues => (issues.hours ? issues.hours : 0))
      .reduce((a, b) => a + b, 0);
  }

  @Watch('issues')
  changeIssuesData() {
    this.issuesData = this.issues ? this.issues : [];
  }
}
</script>

<style scoped>
.q-toolbar {
  padding: 0px;
}
</style>
