<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Swisspay </q-toolbar-title>

        <div>
          <LoginBtn
            :user="authStore.user"
            @onLoginClick="goToLogin"
            @onLogoutClick="logout"
            @onSaveUser="onSave"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import EssentialLink from "./../components/EssentialLink.vue";
import LoginBtn from "../../../../wgo-base/core/components/LoginBtn/LoginBtn.vue";
import { useAuthStore } from "../stores/authStore";
import { RouteService } from "../../../../wgo-base/core/services/RouteService";
import { useRouter } from "vue-router";
import { AuthPaths } from "../../../../wgo-base/authenticacion/router";
import { Paths } from "../router/routes";
import { IUser } from "../../../../wgo-base/core/models";

const linksList = [
  {
    title: Paths.home.name,
    caption: "Home paga",
    icon: "home",
    link: Paths.home.path,
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    LoginBtn,
  },
  data() {
    const router = useRouter();
    return {
      routeService: new RouteService(router),
    };
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const authStore = useAuthStore();
    const router = useRouter();

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      authStore,
      router,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    goToLogin() {
      this.goToPath(AuthPaths.authLogin.path);
    },
    logout() {
      this.authStore.resetState();
      this.goToPath(Paths.home.path);
    },
    goToPath(pathName: string) {
      this.routeService.goTo(pathName);
    },
    onSave(user: IUser) {
      this.authStore.setUser(user);
    },
  },
});
</script>
