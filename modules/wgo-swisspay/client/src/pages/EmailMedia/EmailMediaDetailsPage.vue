<template>
  <div>
    <EmailDetails :emailMedia="emailMedia" :email="email" />
    <Loader :loading="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EmailDetails from '../../components/EmailMedia/EmailDetails/EmailDetails.vue';
import { EmailMediaService } from '../../services/EmailMedia/EmailMediaService';
import Loader from '../../../../../wgo-base/core/components/Loader/Loader.vue';
import { useAuthStore } from '../../stores/authStore';
import { useRoute, useRouter } from 'vue-router';
import { RouteService } from '../../../../../wgo-base/core/services/RouteService';
import { AuthPaths } from '../../../../../wgo-base/authenticacion/router';

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
      emailMedia: {},
      email: {},
      loading: false,
      emailMediaService,
      routeService,
    };
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  async mounted() {
    this.loading = true;
    if (!!this.authStore.getUser) {
      const result = await this.emailMediaService.getEmailMediaById({
        id: this.mediaId || 0,
      });
      if (result) {
        this.email = result.email;
        this.emailMedia = result.emailMedia;
      }
      this.loading = false;
    } else {
      this.routeService.goTo(AuthPaths.authLogin.path, { path: this.$route.path });
    }
  },
});
</script>
