<template>
  <div v-if="!!pollData && !!pollData.textLink">
    <q-banner rounded dense class="bg-grey-3">
      <template v-slot:avatar>
        <q-intersection
          transition="rotate"
          :threshold="0.1"
          style="heigth: 150px"
        >
          <q-icon name="info" color="primary" size="60px" />
        </q-intersection>
      </template>
      <div v-html="pollData.textBanner.text" />

      <template v-slot:action>
        <q-btn
          unelevated
          color="primary"
          :label="pollData.textBanner.clickText"
          @click="openDialog"
        />
      </template>
    </q-banner>

    <Dialog
      :close="() => (showDialog = false)"
      :showModal="showDialog"
      title="Formulario"
    >
      <template slot="content">
        <PollComponent
          :pollData="pollData"
          :onClose="() => (showDialog = false)"
        />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { IPoll } from '../../models/Poll';
import { PollService } from '../../services/PollService';
import { Component, Vue } from 'vue-property-decorator';
import PollComponent from './PollComponent.vue';
import Dialog from '../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    PollComponent,
    Dialog
  }
})
export default class PollBanner extends Vue {
  pollService = new PollService();
  pollData: IPoll = <IPoll>{};
  showDialog = false;

  async openDialog(event: Event) {
    if (!this.pollData || !this.pollData.content) {
      this.pollData = await this.pollService.getPollConfig();
    }
    event.preventDefault();
    this.showDialog = true;
    return false;
  }

  async created() {
    this.pollData = await this.pollService.getPollConfig();
  }
}
</script>
