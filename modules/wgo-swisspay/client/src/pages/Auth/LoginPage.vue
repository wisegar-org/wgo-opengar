<template>
  <LoginComponent @on-login="onLogin" @on-register="goToRegister" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginComponent from "../../../../../wgo-base/authenticacion/components/LoginComponent.vue";
import { ISuccesLogin } from "../../../../../wgo-base/authenticacion/models";
import { RouteService } from "../../../../../wgo-base/core/services/RouteService";
import { useRouter } from "vue-router";
import { Paths } from "../../router/routes";
import { useAuthStore } from "../../stores/authStore";

export default defineComponent({
  name: "LoginPage",
  components: {
    LoginComponent,
  },
  data() {
    const router = useRouter();
    return {
      routeService: new RouteService(router),
    };
  },
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
  methods: {
    onLogin(value: ISuccesLogin) {
      console.log("Component login result");
      console.log(value);
      this.authStore.setLogin(value);
      this.routeService.goTo(Paths.home.path);
    },
    goToRegister() {
      this.routeService.goTo(Paths.authRegister.path);
    },
  },
});
</script>
