<template>
  <q-layout view="hHh Lpr lff">
    <q-header>
      <q-toolbar>
        <LeftDrawer
          :items="menuItems"
          :authStore="authStore"
          :tranStore="tranStore"
          :routeService="routeService"
        />
        <q-toolbar-title>
          {{ getLabel(title || tranBase.APP_ADMIN_TITLE) }}
        </q-toolbar-title>

        <div class="row">
          <LanguageSelector :langStore="langStore" class="q-mx-sm" />
          <LoginBtn
            :user="authStore.user"
            :tranStore="tranStore"
            :authStore="authStore"
            :emails="emails"
            @onLoginClick="goToLogin"
            @onLogoutClick="logout"
            @onSaveUser="onSave"
          />
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { AuthStore } from "../../../authentication/models/AuthStore";
import { TranslationStore } from "../../../translation/models/TranslationStore";
import { MenuListItem } from "../../models/Menu";
import { RouteService } from "../../services/RouteService";
import LeftDrawer from "../Menu/LeftDrawer.vue";
import { translations as tranBase } from "../../models";
import { BaseTranslateComponent } from "../BaseComponents";
import LoginBtn from "../LoginBtn/LoginBtn.vue";
import LanguageSelector from "../../../language/components/LanguageSelector/LanguageSelector.vue";
import { LanguageStore } from "../../../language/models/LanguageStore";
import { AuthPaths } from "../../../authentication/router";

export default defineComponent({
  name: "AdminMainLayout",
  props: {
    menuItems: {
      type: Array as PropType<MenuListItem[]>,
      default: [],
    },
    emails: { type: Array as PropType<string[]>, default: [] },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    langStore: { type: Object as PropType<LanguageStore>, required: true },
    authStore: { type: Object as PropType<AuthStore>, required: true },
    routeService: { type: Object as PropType<RouteService>, required: true },
    homePath: { type: String, default: "/" },
    title: { type: String, default: "" },
  },
  components: {
    LeftDrawer,
    LoginBtn,
    LanguageSelector,
  },
  setup(props) {
    const { getLabel } = new BaseTranslateComponent();

    return {
      tranBase,
      getLabel: (name: string) => getLabel(props.tranStore, name),
    };
  },
  methods: {
    onSave(user: any) {
      this.$emit("onSaveUser", user);
    },
    goToLogin() {
      this.goToPath(AuthPaths.authLogin.path);
    },
    logout() {
      this.authStore.resetState();
      this.goToPath(this.homePath);
    },
  },
  emits: ["onSaveUser"],
});
</script>
