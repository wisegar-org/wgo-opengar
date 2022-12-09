<template>
  <div>
    <SimpleViewIssues :issues="issues" :title="getTitle()" />
  </div>
</template>

<script lang="ts">
import {
  Dictionary,
  IssuesRecord,
} from '@wisegar-org/wgo-base-models/build/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import SimpleViewIssues from '../../../Issues/SimpleViewIssues/SimpleViewIssues.vue';
import { Getter } from 'vuex-class';
import {
  languageGetters,
  languageNamespace,
} from '../../../../../wgo/store/Language';
import { ITranslationFinanceAccountingKeys } from '../../TranslationsKeys';

@Component({
  components: {
    SimpleViewIssues,
  },
})
export default class ShowIssuesToAccount extends Vue {
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationFinanceAccountingKeys;
  @Prop() issues!: IssuesRecord[];
  @Prop() collaborator!: Dictionary;

  getTitle() {
    return this.collaborator
      ? `${this.translationContent.WGO_FINANCE_ACCOUNTING_STEP_ISSUES}: ${this.collaborator.login}`
      : this.translationContent.WGO_FINANCE_ACCOUNTING_STEP_ISSUES;
  }
}
</script>
