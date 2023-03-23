<template>
  <div v-if="!!pollData && !!pollData.textLink">
    <p class="text-body1">
      {{ pollData.textLink.text }}
      <a href="#" @click="openDialog">{{ pollData.textLink.clickText }}</a>
    </p>
    <Dialog
      :close="() => (showDialog = false)"
      :showModal="showDialog"
      title="Formulario"
      styleDialog="width: 500px; max-width: 80vw"
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

@Component({
  components: {
    PollComponent
  }
})
export default class PollDialog extends Vue {
  pollService = new PollService();
  pollData: IPoll = <IPoll>{};
  showDialog = false;

  openDialog(event: Event) {
    event.preventDefault();
    this.showDialog = true;
    return false;
  }

  async mounted() {
    this.pollData = await this.pollService.getPollConfig();
  }
}
</script>
