<template>
  <div>
    <ChangePasswordComponent
      v-if="!!token"
      :token="token"
      @onChangePassword="onEmailConfirm"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { IUser } from "../../../../../wgo-base/core/models";
import { RouteService } from "../../../../../wgo-base/core/services/RouteService";
import ChangePasswordComponent from "../../../../../wgo-base/authenticacion/components/ChangePasswordComponent.vue";
import { AuthPaths } from "../../../../../wgo-base/authenticacion/router";
export default defineComponent({
  name: "RegisterChangePasswordPage",
  components: { ChangePasswordComponent },
  data() {
    const route = useRoute();
    const router = useRouter();
    return {
      routeService: new RouteService(router),
      token: (route.query.token as string) || "",
    };
  },
  methods: {
    onEmailConfirm() {
      this.routeService.goTo(AuthPaths.authLogin.path);
    },
  },
});
</script>
