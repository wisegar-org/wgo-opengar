<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    title="Collaborator stats"
    :close="() => onClose()"
    styleDialog="width: 800px; max-width: 80vw"
  >
    <template slot="content">
      <StatsCollaborator
        :close="close"
        :collaborator="collaborator"
        :showLoading="value => (showLoading = value)"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { CollaboratorRecord } from '../../../models/models';
import { Component, Prop, Vue } from 'vue-property-decorator';
import StatsCollaborator from './StatsCollaborator.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    StatsCollaborator,
    Dialog
  }
})
export default class StatsCollaboratorDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() collaborator!: CollaboratorRecord;
  showLoading = false;

  onClose() {
    if (this.close) {
      this.close();
    }
  }
}
</script>
