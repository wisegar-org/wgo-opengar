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
              :prefix="
                `${translationContent.WGO_FINANCE_ISSUES_COLUMN_HOURS}: `
              "
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
import { Action, Getter } from 'vuex-class';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../../../../wgo/store/Language';
import {
  ITranslationFinanceIssuesKeys,
  TranslationsKeys
} from '../TranslationsKeys';

@Component({})
export default class SimpleViewIssues extends Vue {
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationFinanceIssuesKeys;
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

  async mounted() {
    await this.registerTranslations(TranslationsKeys);
  }
}
</script>

<style scoped>
.q-toolbar {
  padding: 0px;
}
</style>
