<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
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
            :emails="emailList"
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
import LoginBtn from '@wisegar-org/wgo-base-client/build/core/components/LoginBtn/LoginBtn.vue';
import { useAuthStore } from '../stores/authStore';
import { RouteService } from '@wisegar-org/wgo-base-client/build/core/services/RouteService';
import { useRouter } from 'vue-router';
import { AuthPaths } from '@wisegar-org/wgo-base-models/build/authentication';
import { Paths } from '../router/paths';
import { IUser } from '@wisegar-org/wgo-base-models/build/core';
import { LinksList } from './MenuSettings';
import { useQuasar } from 'quasar';
import Menu from '../components/Menu/Menu.vue';
import LanguageSelector from '@wisegar-org/wgo-base-client/build/language/components/LanguageSelector/LanguageSelector.vue';
import { useLanguageStore } from '../stores/languageStore';
import { useTranslationStore } from '../stores/translationStore';
import { translations } from './translationsKey';
import { authTranslations } from '@wisegar-org/wgo-base-models/build/authentication';
import { LanguageStore } from '@wisegar-org/wgo-base-client/build/language/store/LanguageStore';
import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';
import { useNotifyStore } from '../stores/notifyStore';
import { BaseTranslateComponent } from '@wisegar-org/wgo-base-client/build/core/components/BaseComponents';
import { EmployeesService } from '../services/Employees/EmployeesService';

export default defineComponent({
  name: 'MainLayout',

  components: {
    LoginBtn,
    Menu,
    LanguageSelector,
  },
  data() {
    const emailList: string[] = [];
    return {
      emailList,
    };
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const routeService = new RouteService(router as any);
    const $q = useQuasar();
    const langStore = useLanguageStore();
    const transStore = useTranslationStore();
    const notify = useNotifyStore();
    const { getLabel } = new BaseTranslateComponent();

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
      notify,
      getLabel: (name: string) => getLabel(transStore.translationStore as any, name),
      showMenu,
      goToPath,
      authStore: authStore.authStore,
      router,
      langStore: langStore.languageStore as LanguageStore,
      transStore: transStore.translationStore as TranslationStore,
      translations,
      authTranslations,
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
      this.notify.setNotify({
        message: this.getLabel(this.authTranslations.EDIT_USER_SUCCESS),
        position: 'top',
        type: 'positive',
      });
    },
  },
  async created() {
    if (this.authStore.user.id) {
      const employServices = new EmployeesService();
      this.emailList = await employServices.getAllEmailsEmployees({
        id: this.authStore.user.id,
      });
    }
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
