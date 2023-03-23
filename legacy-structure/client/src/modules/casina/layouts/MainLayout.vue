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
        <q-tabs shrink v-if="!loading">
          <q-route-tab
            v-for="(path, key) in paths"
            :key="'webMenu-' + key"
            :name="path.name"
            :label="getLabels(path.name)"
            class="q-px-md"
            :to="path.url"
          />
          <q-route-tab
            v-if="isUserAdmin()"
            :name="adminRoute.name"
            :label="getLabels(adminRoute.name)"
            class="q-px-md"
            :to="adminRoute.url"
          />
        </q-tabs>
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
import { IPath, CasinaPaths } from '../settings/ApiSettings';
import LanguageSelect from '../../wgo/components/Languages/LanguageSelect/LanguageSelect.vue';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../../wgo/store/Language';
import { BoolDictionary } from '../../wgo/models';
import { userGetters, userNamespace } from '../../wgo/store/User';
import { UserGql } from '../../../graphql';
import { IndexAdminRoute } from '../../wgo/settings/RouterSettings';

@Component({
  components: {
    LanguageSelect
  }
})
export default class MainLayout extends Vue {
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: { [key: string]: string };
  @Getter(userGetters.getLoggedUser, { namespace: userNamespace })
  user!: UserGql;
  titleKey = 'WGO_CASINA_TITLE';
  footerKey = 'WGO_CASINA_FOOTER_LABEL';
  loading = true;
  adminRoute: IPath = {
    name: 'WGO_ADMIN_TITLE',
    url: IndexAdminRoute.path
  };

  paths: IPath[] = [CasinaPaths.home]; //Object.values(CasinaPaths);
  layoutKeys = {
    [this.titleKey]: true,
    [this.footerKey]: true
  };

  goToHome() {
    if (this.$route.path !== '/') {
      void this.$router.push('/');
    }
  }

  getLabels(key: string) {
    return key in this.translationContent ? this.translationContent[key] : key;
  }

  isUserAdmin() {
    return (
      this.user &&
      this.user.roles.filter(
        rol =>
          rol.name
            .toString()
            .toLowerCase()
            .indexOf('admin') !== -1
      ).length > 0
    );
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
