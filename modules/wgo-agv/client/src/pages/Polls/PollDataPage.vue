<template>
  <div class="row justify-center">
    <PollComponent
      class="col-12 col-md-10"
      :pollData="pollData"
      v-if="showPage()"
      @onClose="closePage"
    />
  </div>
</template>

<script lang="ts">
import { IPoll } from "../../models/Poll";
import { PollService } from "../../services/PollService";
import { defineComponent } from "vue";
import PollComponent from "../../components/PollComponent/PollComponent.vue";

export default defineComponent({
  name: "PollDataPage",
  components: {
    PollComponent,
  },
  data() {
    return {
      pollData: <IPoll>{},
      pollService: new PollService(),
    };
  },
  methods: {
    closePage() {
      window.close();
    },
    showPage() {
      return (
        this.pollData && this.pollData.header && this.pollData.header.title
      );
    },
  },
  async mounted() {
    this.pollData = await this.pollService.getPollConfig();
  },
});
</script>
  