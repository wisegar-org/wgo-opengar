<template>
  <q-layout view="hHh Lpr fff" style="display: flex; justify-content: center;">
    <q-header>
      <q-toolbar>
        <q-avatar @click="goToHome" class="cursor-pointer">
          <img src="favicon.ico" />
        </q-avatar>
        <q-toolbar-title v-if="!loading">
          <div
            class="cursor-pointer"
            @click="goToHome"
            style="width: fit-content"
          >
            {{ getLabels(titleKey) }}
          </div>
        </q-toolbar-title>
        <LanguageSelect />
        <UserMenu :goToHome="true" />
        <q-btn
          unelevated
          v-if="!userLoged"
          flat
          icon="login"
          :label="$t('indexPage.menu.login')"
          @click="goToLogin"
        />
      </q-toolbar>
    </q-header>
    <q-footer>
      <div v-if="!loading" class="text-center q-toolbar__title q-pa-sm">
        {{ getLabels(footerKey) }}
      </div>
    </q-footer>
    <q-page-container
      class="q-pa-sm row justify-evenly"
      style="width: 100%; max-width: 1800px;"
    >
      <router-view class="col-12 col-sm-10" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import LanguageSelect from '../../wgo/components/Languages/LanguageSelect/LanguageSelect.vue';
import { GithubPaths, IPath } from '../router';
import UserMenu from '../../wgo/components/UserMenu/UserMenu.vue';
import { userGetters, userNamespace } from '../../wgo/store/User';
import { OpengarPaths } from '../../wgo/settings/ApiSettings';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../../wgo/store/Language';
import { BoolDictionary } from '../../wgo/models';

@Component({
  components: {
    LanguageSelect,
    UserMenu
  }
})
export default class EmptyLayout extends Vue {
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: { [key: string]: string };

  @Getter(userGetters.isLogged, { namespace: userNamespace })
  userLoged!: boolean;

  titleKey = 'WGO_FINANCE_INDEX_TITLE';
  footerKey = 'WGO_FINANCE_INDEX_FOOTER_LABEL';
  loading = true;

  paths: IPath[] = [GithubPaths.homePage, GithubPaths.homePageFinance]; //Object.values(CasinaPaths);
  layoutKeys = {
    [this.titleKey]: true,
    [this.footerKey]: true
  };

  goToHome() {
    if (this.$route.path !== '/') {
      void this.$router.push('/');
    }
  }

  goToLogin() {
    void this.$router.push(OpengarPaths.login.url);
  }

  getLabels(key: string) {
    return key in this.translationContent ? this.translationContent[key] : key;
  }

  async registerItemsLabels() {
    const keys: BoolDictionary = { ...this.layoutKeys };
    this.paths.forEach(item => {
      if (item.name.startsWith('WGO_')) keys[item.name] = true;
    });
    await this.registerTranslations(keys);
  }

  async created() {
    await this.registerItemsLabels();
    this.loading = false;
  }
}
</script>

<style lang="stylus">
$primary = #ACCF5A

:root
  --q-color-primary = #ACCF5A
</style>
