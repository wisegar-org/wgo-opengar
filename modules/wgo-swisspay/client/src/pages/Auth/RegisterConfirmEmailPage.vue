<template>
  <div>
    <ConfirmEmailComponent
      v-if="!!token"
      :token="token"
      @onConfirm="onEmailConfirm"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { IUser } from "../../../../../wgo-base/core/models";
import { RouteService } from "../../../../../wgo-base/core/services/RouteService";
import ConfirmEmailComponent from "../../../../../wgo-base/authenticacion/components/ConfirmEmailComponent.vue";
import { AuthPaths } from "../../../../../wgo-base/authenticacion/router";
export default defineComponent({
  name: "RegisterConfirmEmailPage",
  components: { ConfirmEmailComponent },
  data() {
    const route = useRoute();
    const router = useRouter();
    return {
      routeService: new RouteService(router),
      token: (route.query.token as string) || "",
    };
  },
  methods: {
    onEmailConfirm(confirmed: boolean) {
      if (confirmed) {
        this.routeService.goTo(AuthPaths.authLogin.path);
      } else {
        this.routeService.goTo(AuthPaths.authResendConfirmation.path);
      }
    },
  },
});
</script>
