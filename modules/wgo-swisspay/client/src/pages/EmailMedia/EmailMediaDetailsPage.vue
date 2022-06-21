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
    return {
      emailMedia: {},
      email: {},
      loading: false,
      emailMediaService,
    };
  },
  async mounted() {
    this.loading = true;
    const result = await this.emailMediaService.getEmailMediaById({
      id: this.mediaId || 0,
    });
    if (result) {
      this.email = result.email;
      this.emailMedia = result.emailMedia;
    }
    this.loading = false;
  },
});
</script>
