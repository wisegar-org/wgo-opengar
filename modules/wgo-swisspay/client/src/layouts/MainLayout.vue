<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="showMenu" />

        <q-toolbar-title> {{ transStore.getTranslation(translations.APP_TITLE) }} </q-toolbar-title>

        <div class="row">
          <LanguageSelector :langStore="langStore" class="q-mx-sm" />
          <LoginBtn
            :user="authStore.user"
            :tranStore="transStore"
            :authStore="authStore"
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
import { defineComponent, ref } from 'vue';
import LoginBtn from '../../../../wgo-base/core/components/LoginBtn/LoginBtn.vue';
import { useAuthStore } from '../stores/authStore';
import { RouteService } from '../../../../wgo-base/core/services/RouteService';
import { useRouter } from 'vue-router';
import { AuthPaths } from '../../../../wgo-base/authentication/router';
import { Paths } from '../router/paths';
import { IUser } from '../../../../wgo-base/core/models';
import { LinksList } from './MenuSettings';
import { useQuasar } from 'quasar';
import Menu from '../components/Menu/Menu.vue';
import LanguageSelector from '../../../../wgo-base/language/components/LanguageSelector/LanguageSelector.vue';
import { useLanguageStore } from '../stores/languageStore';
import { useTranslationStore } from '../stores/translationStore';
import { translations } from './translationsKey';
import { LanguageStore } from '../../../../wgo-base/language/models/LanguageStore';
import { TranslationStore } from '../../../../wgo-base/translation/models/TranslationStore';

export default defineComponent({
  name: 'MainLayout',

  components: {
    LoginBtn,
    Menu,
    LanguageSelector,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const routeService = new RouteService(router);
    const $q = useQuasar();
    const langStore = useLanguageStore();
    const transStore = useTranslationStore();

    function goToPath(pathName: string) {
      routeService.goTo(pathName);
    }
    function showMenu() {
      $q.dialog({
        component: Menu,
        componentProps: {
          links: LinksList,
        },
      });
    }
    return {
      showMenu,
      goToPath,
      authStore: authStore.authStore,
      router,
      langStore: langStore.languageStore as LanguageStore,
      transStore: transStore.translationStore as TranslationStore,
      translations,
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
    onSave(user: IUser) {
      this.authStore.setUser(user);
    },
  },
});
</script>

<style scoped>
.myClassBottomSheet {
  top: 0;
}

.fixed-bottom {
  left: 0 !important;
  top: 0 !important;
}
</style>
