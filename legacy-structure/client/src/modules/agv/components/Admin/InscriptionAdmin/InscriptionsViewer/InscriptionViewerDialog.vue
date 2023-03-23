<template>
  <Dialog
    :loading="showLoading"
    :close="() => onClose()"
    :showModal="showModal"
    title="Dettagli di iscrizione"
    styleDialog="width: 600px; max-width: 80vw"
  >
    <template slot="content">
      <InscriptionViewer
        :inscription="inscription"
        :close="() => onClose()"
        :showLoading="(value) => (showLoading = value)"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import InscriptionViewer from './InscriptionViewer.vue';
import Dialog from '../../../../../wgo/components/Dialog/Dialog.vue';
import { AgvInscriptionResponseModel } from '@wisegar-org/wgo-base-models/build/GraphqlModels';

@Component({
  components: {
    InscriptionViewer,
    Dialog,
  },
})
export default class InscriptionViewerDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop({ required: true }) inscription!: AgvInscriptionResponseModel;

  showLoading = false;
  onClose() {
    if (this.close) {
      this.close();
    }
  }
}
</script>
