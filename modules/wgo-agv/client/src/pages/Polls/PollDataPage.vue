<template>
  <div class="row justify-center">
    <PollComponent
      class="col-12 col-md-10"
      :pollData="appContentStore.pollDataObj"
      v-if="showPage()"
      @onClose="closePage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PollComponent from "../../components/PollComponent/PollComponent.vue";
import { useAppContentStore } from "../../stores/appContentStore";

export default defineComponent({
  name: "PollDataPage",
  components: {
    PollComponent,
  },
  setup(props, ctx) {
    const appContentStore = useAppContentStore();
    return {
      appContentStore,
    };
  },
  methods: {
    closePage() {
      window.close();
    },
    showPage() {
      return (
        this.appContentStore.pollDataObj.header &&
        this.appContentStore.pollDataObj.header.title
      );
    },
  },
  async mounted() {
    await this.appContentStore.loadPollData();
  },
});
</script>
  