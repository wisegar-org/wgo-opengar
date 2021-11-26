<template>
  <div>
    <SimpleViewIssues :issues="issues" :title="getTitle()" />
  </div>
</template>

<script lang="ts">
import { Dictionary, IssuesRecord } from '../../../../models/models'
import { Component, Prop, Vue } from 'vue-property-decorator'
import SimpleViewIssues from '../../../Issues/SimpleViewIssues/SimpleViewIssues.vue'

@Component({
  components: {
    SimpleViewIssues,
  },
})
export default class ShowIssuesToAccount extends Vue {
  @Prop() issues!: IssuesRecord[]
  @Prop() collaborator!: Dictionary

  getTitle() {
    return this.collaborator ? `Issues of ${this.collaborator.login}` : 'Issues'
  }
}
</script>
