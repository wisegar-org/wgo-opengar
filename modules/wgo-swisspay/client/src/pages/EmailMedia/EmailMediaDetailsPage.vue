<template>
  <div>
    <EmailDetails :emailMedia="emailMedia" :email="email" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EmailDetails from '../../components/EmailMedia/EmailDetails/EmailDetails.vue';
import { EmailMediaService } from '../../services/EmailMedia/EmailMediaService';
import Loader from '@wisegar-org/wgo-base-client/build/core/components/Loader/Loader.vue';
import { useAuthStore } from '../../stores/authStore';
import { useRoute, useRouter } from 'vue-router';
import { RouteService } from '@wisegar-org/wgo-base-client/build/core/services/RouteService';
import { AuthPaths } from '@wisegar-org/wgo-base-models';
import { useAppStatusStore } from '../../stores/appStatusStore';
import { IEmailMediaModel, IEmailModel } from '../../../../src/models/EmailModel';

export default defineComponent({
  name: 'EmailMediaDetailsPage',
  components: {
    EmailDetails,
    Loader,
  },
  props: {
    mediaId: Number,
  },
  data() {
    const emailMediaService = new EmailMediaService();
    const router = useRouter();
    const routeService = new RouteService(router);
    return {
      emailMedia: {} as IEmailMediaModel,
      email: {} as IEmailModel,
      emailMediaService,
      routeService,
      route: useRoute(),
    };
  },
  setup() {
    const authStore = useAuthStore();
    const appStatusStore = useAppStatusStore();
    return { authStore, appStatusStore };
  },
  async mounted() {
    if (!!this.authStore.getUser) {
      this.appStatusStore.loading = true;
      const result = await this.emailMediaService.getEmailMediaById({
        id: this.mediaId || 0,
      });
      this.appStatusStore.loading = false;
      if (result) {
        this.email = result.email;
        this.emailMedia = result.emailMedia;
      }
    } else {
      this.routeService.goTo(AuthPaths.authLogin.path, { path: this.route.path });
    }
  },
});
</script>
