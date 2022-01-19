<template>
  <q-layout view="hHh Lpr lff">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          unelevated
          icon="menu"
          aria-label="Menu"
          @click="() => onHandleOpenRightDrawer()"
        />
        <q-toolbar-title>
          {{ translationContent.WGO_ADMIN_TITLE }}
        </q-toolbar-title>
        <LanguageSelect :languagesConfig="languagesConfig" />
        <UserMenu v-if="!innerLoadding" :items="userMenuItems" />
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
    <LeftDrawer v-if="!innerLoadding" :items="itemsDrawer" />
    <q-page-container>
      <BreadCrumbs v-if="!innerLoadding" :items="breadCrumbsItem" />
      <router-view />
      <edit-profile
        v-if="userLoged && showEditProfile"
        :userProfile="user"
        :openDialog="editProfile"
        :closeDialog="() => showEdit(false)"
        :onUpdateProfile="updateProfileCache"
      />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EditProfile from '../components/EditProfile.vue';

import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';
import { UserGql } from '../../../graphql';
import { ApiSettings } from '../../../boot/settings';
import LeftDrawer from '../components/LeftDrawer/LeftDrawer.vue';
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs.vue';
import {
  componentsNamespace,
  componentsSettedKeys,
  componentsGettedKeys,
  componentsActionsKeys
} from '../store/ComponentsState';
import { getDrawerItems } from '../settings/LeftDrawerSettings';
import {
  BoolDictionary,
  IList,
  IListItemNavigationCallBack,
  IListSeparator,
  INavigationTo,
  INotify,
  ITranslations
} from '../models';
import { IBreadCrumbItem } from '../models/IBreadCrumbItem';
import UserMenu from '../components/UserMenu/UserMenu.vue';
import LanguageSelect from '../components/Languages/LanguageSelect/LanguageSelect.vue';
import { LanguagesConfig } from '../../../i18n';
import { RouteService } from '../services';
import { userActions, userGetters, userNamespace } from '../store/User';
import { OpengarPaths } from '../settings/ApiSettings';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../store/Language';

@Component({
  components: { EditProfile, LeftDrawer, BreadCrumbs, UserMenu, LanguageSelect }
})
export default class MainLayout extends Vue {
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslations;
  @Getter(userGetters.getLoggedUser, { namespace: userNamespace })
  user!: UserGql;
  @Getter(userGetters.isLogged, { namespace: userNamespace })
  userLoged!: boolean;
  @Action(userActions.logoutUser, { namespace: userNamespace })
  logoutUserAction!: () => unknown;
  @Action(userActions.loadUserLogged, { namespace: userNamespace })
  loadUserLogged!: () => unknown;
  @Getter(componentsGettedKeys.getLeftDrawerOpen, {
    namespace: componentsNamespace
  })
  leftDrawerOpen!: boolean;
  @Mutation(componentsSettedKeys.setLeftDrawerOpen, {
    namespace: componentsNamespace
  })
  setLeftDrawerOpen!: (value: boolean) => void;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  setNotify!: (value: INotify) => void;
  routerService: RouteService;
  itemsDrawer: IList[] = [];
  breadCrumbsItem: INavigationTo[];
  userMenuItems: IListItemNavigationCallBack[];

  languagesConfig = LanguagesConfig;
  innerLoadding = true;

  @Prop() itemsPaths!: IBreadCrumbItem[];
  @Prop() geDrawerItems!: (router: RouteService) => IList[];
  @Prop({ default: true }) showEditProfile!: false;

  constructor() {
    super();
    this.routerService = new RouteService(this.$router);

    this.getItemsDrawer();
    this.breadCrumbsItem = this.itemsPaths;
    this.userMenuItems = this.showEditProfile
      ? [
          {
            label: 'WGO_USERS_MENU_EDIT_PROFILE',
            icon: 'apps',
            onClick: () => this.showEdit(true),
            type: 'item'
          }
        ]
      : [];
  }

  showing = false;
  editProfile = false;
  goToLogin() {
    void this.$router.push(OpengarPaths.login.url);
  }
  showMenu() {
    this.showing = true;
  }
  logoutUser() {
    this.logoutUserAction();
    this.goToLogin();
  }
  showEdit(open: boolean) {
    this.editProfile = open;
  }
  updateProfileCache() {
    this.showEdit(false);
    const msg = this.$t('editProfilesuccess');
    this.setNotify(<INotify>{
      type: 'positive',
      message: msg
    });
  }
  profileImage() {
    return ApiSettings.DEFAULT_USER_PROFILE;
  }

  onHandleOpenRightDrawer() {
    this.setLeftDrawerOpen(!this.leftDrawerOpen);
  }

  @Watch('itemsPaths')
  async registerLabelKey() {
    const keys: BoolDictionary = {};
    this.itemsPaths.forEach(item => {
      if (item.label.startsWith('WGO_')) keys[item.label] = true;
    });
    await this.registerTranslations(keys);
    this.getItemsDrawer();
  }

  getItemsDrawer() {
    if (this.geDrawerItems)
      this.itemsDrawer = this.geDrawerItems(this.routerService);
    else {
      this.itemsDrawer = this.itemsPaths
        ? getDrawerItems(this.routerService, this.itemsPaths)
        : [];
    }
    this.breadCrumbsItem = this.itemsPaths;
  }

  async mounted() {
    await this.loadUserLogged();
    if (!this.userLoged) {
      this.logoutUser();
    }
  }

  async created() {
    await this.registerLabelKey();
    this.innerLoadding = false;
  }
}
</script>
