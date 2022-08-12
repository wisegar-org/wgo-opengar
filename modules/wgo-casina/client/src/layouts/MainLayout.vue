<template>
  <q-layout view="hHh Lpr fff" style="display: flex; justify-content: center">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          {{ transStore.getTranslation(transBase.APP_TITLE) }}
        </q-toolbar-title>

        <div class="row">
          <LanguageSelector :langStore="langStore" class="q-mx-sm" />
          <q-tabs shrink>
            <q-route-tab
              v-for="(path, key) in paths"
              :key="'webMenu-' + key"
              :name="path.name"
              :label="getLabel(path.label)"
              class="q-px-md"
              :to="path.path"
            />
            <q-route-tab
              v-if="isSuperAdmin()"
              :name="adminPath.name"
              :label="getLabel(adminPath.label)"
              class="q-px-md"
              :to="adminPath.path"
            />
          </q-tabs>
          <LoginBtn
            :user="authStore.user"
            :tranStore="transStore"
            :authStore="authStore"
            @onLoginClick="goToLogin"
            @onLogoutClick="logout"
            @onSaveUser="onSave"
            class="q-pl-sm"
          />
        </div>
      </q-toolbar>
    </q-header>
    <q-footer>
      <div v-if="!loading" class="text-center q-toolbar__title q-pa-sm">
        {{ getLabel(transBase.APP_FOOTER) }}
      </div>
    </q-footer>
    <q-page-container class="q-pa-sm row justify-evenly" style="width: 100%; max-width: 1800px">
      <router-view class="col-12 col-sm-10" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginBtn from '../wgo-base/core/components/LoginBtn/LoginBtn.vue';
import { useAuthStore } from '../stores/authStore';
import { RouteService } from '../wgo-base/core/services/RouteService';
import { useRouter } from 'vue-router';
import { AuthPaths } from '../wgo-base/authentication/router';
import { Paths } from '../router/paths';
import { IUser } from '../wgo-base/core/models';
import LanguageSelector from '../wgo-base/language/components/LanguageSelector/LanguageSelector.vue';
import { useLanguageStore } from '../stores/languageStore';
import { useTranslationStore } from '../stores/translationStore';
import { LanguageStore } from '../wgo-base/language/models/LanguageStore';
import { TranslationStore } from '../wgo-base/translation/models/TranslationStore';
import { translations as transBase } from '../wgo-base/core/models/translations';
import { BaseTranslateComponent } from '../wgo-base/core/components/BaseComponents';
import { SUPERADMIN } from '../wgo-base/authentication/models';
import { AdminPaths } from '../wgo-base/core/router';

export default defineComponent({
  name: 'MainLayout',

  components: {
    LoginBtn,
    LanguageSelector,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const routeService = new RouteService(router as any);
    const langStore = useLanguageStore();
    const transStore = useTranslationStore();

    const { getLabel } = new BaseTranslateComponent();

    function goToPath(pathName: string) {
      routeService.goTo(pathName);
    }
    const paths = [Paths.home];

    return {
      adminPath: AdminPaths.admin,
      paths,
      loading: false,
      goToPath,
      authStore: authStore.authStore,
      router,
      langStore: langStore.languageStore as LanguageStore,
      transStore: transStore.translationStore as TranslationStore,
      transBase,
      getLabel: (name: string) => getLabel(transStore.translationStore as TranslationStore, name),
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
    isSuperAdmin() {
      return this.authStore.isUserInRole([SUPERADMIN]);
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
