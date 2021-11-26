<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    :title="getTitle()"
    :close="() => onClose()"
    styleDialog="width: 400px; max-width: 80vw"
  >
    <template slot="content">
      <EditAccountingCollaborator
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
import EditAccountingCollaborator from './EditAccountingCollaborator.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    EditAccountingCollaborator,
    Dialog
  }
})
export default class EditAccountingCollaboratorDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() collaborator!: CollaboratorRecord;
  showLoading = false;

  onClose() {
    if (this.close) {
      this.close();
    }
  }

  getTitle() {
    return !this.collaborator
      ? 'Create client/provider'
      : this.collaborator.isCollaborator
      ? 'Edit collaborator'
      : 'Edit client/provider';
  }
}
</script>
