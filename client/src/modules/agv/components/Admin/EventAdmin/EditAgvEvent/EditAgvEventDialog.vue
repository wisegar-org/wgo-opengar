<template>
  <Dialog
    :loading="showLoading"
    :close="() => onClose()"
    :showModal="showModal"
    :title="getTitle()"
  >
    <template slot="content">
      <EditAgvEvent
        :close="close"
        :agvEvent="agvEvent"
        :showLoading="value => (showLoading = value)"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { AgvEventResponseModel } from 'src/modules/agv/models/GraphqlModels';
import { Component, Prop, Vue } from 'vue-property-decorator';
import EditAgvEvent from './EditAgvEvent.vue';
import Dialog from '../../../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    EditAgvEvent,
    Dialog
  }
})
export default class EditAgvEventDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() agvEvent!: AgvEventResponseModel;
  showLoading = false;

  onClose() {
    if (this.close) {
      this.close();
    }
  }

  getTitle() {
    return !this.agvEvent ? 'Crea Evento' : 'Modifica Evento';
  }
}
</script>
