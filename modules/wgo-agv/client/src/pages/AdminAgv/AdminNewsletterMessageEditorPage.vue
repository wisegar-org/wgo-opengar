<template>
  <q-page class="row justify-evenly">
    <div class="col-12">
      <NsLtMessageAdminEditor :message="message" @success="goToMessage" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { AGVNewsletterMessageStatusEnum } from "../../../../src/models/enums";
import { AGVNewsletterMessageModel } from "../../../../src/models/Newsletter/NewsletterMessageModel";
import { AGVNewsletterMessageResponse } from "../../../../src/resolvers/Newsletter/AGVNewsletterMessageResponses";
import { RouteService } from "../../../../src/wgo-base/core/services/RouteService";
import NsLtMessageAdminEditor from "../../components/NsLtMessageAdminEditor/NsLtMessageAdminEditor.vue";
import { NewsletterMessageService } from "../../services/Newsletter/NwLtMessengerService";
import { AGVNewslettersAdminPaths } from "../../router/paths/adminAgv/newslettersPaths";
import { useAppStatusStore } from "../../stores/appStatusStore";

export default defineComponent({
  name: "AdminNewsletterMessageEditorPage",
  props: {
    id: { type: Number, default: 0 },
    page: { type: Number, default: 0 },
  },
  components: {
    NsLtMessageAdminEditor,
  },
  data() {
    const emptyMessage: AGVNewsletterMessageResponse = {
      id: 0,
      title: "",
      message: "",
      status: AGVNewsletterMessageStatusEnum.Waiting,
    };

    return {
      message: {
        ...emptyMessage,
      },
      emptyMessage,
      newsletterService: new NewsletterMessageService(),
    };
  },
  setup() {
    const appStatusStore = useAppStatusStore();
    return {
      appStatusStore,
    };
  },
  methods: {
    async loadData() {
      this.appStatusStore.setLoading(true);
      if (this.id) {
        const result = await this.newsletterService.getNewsletterMessageById(
          this.id
        );
        if (result)
          this.message = {
            id: result.id || 0,
            message: result.message,
            title: result.title,
            status: result.status,
          };
      } else {
        this.message = { ...this.emptyMessage };
      }
      this.appStatusStore.setLoading(false);
    },
    goToMessage() {
      const routeService = new RouteService(this.$router as any);
      routeService.goTo(AGVNewslettersAdminPaths.newsletterMessages.path, {
        page: this.page,
      });
    },
  },
  async mounted() {
    await this.loadData();
  },
});
</script>
