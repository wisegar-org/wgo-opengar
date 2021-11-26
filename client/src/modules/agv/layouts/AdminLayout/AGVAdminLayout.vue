<template>
  <q-layout view="hHh Lpr lff">
    <q-header>
      <q-toolbar>
        <q-btn
          unelevated
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="() => onHandleOpenRightDrawer()"
        />
        <q-toolbar-title>
          {{ title }}
        </q-toolbar-title>
        <UserMenu :goToHome="true" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <LeftDrawer :items="itemsDrawer" />
      <BreadCrumbs :items="breadCrumbsItem" />
      <router-view />
      <edit-profile
        v-if="userLoged"
        :userProfile="user"
        :openDialog="editProfile"
        :closeDialog="() => showEdit(false)"
        :onUpdateProfile="updateProfileCache"
      />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EditProfile from '../../../wgo/components/EditProfile.vue';
import LeftDrawer from '../../../wgo/components/LeftDrawer/LeftDrawer.vue';
import BreadCrumbs from '../../../wgo/components/BreadCrumbs/BreadCrumbs.vue';
import UserMenu from '../../../wgo/components/UserMenu/UserMenu.vue';

import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';
import {
  userActions,
  userGetters,
  userNamespace
} from 'src/modules/wgo/store/User';
import { UserGql } from '../../../../graphql';
import {
  componentsActionsKeys,
  componentsGettedKeys,
  componentsNamespace,
  componentsSettedKeys
} from 'src/modules/wgo/store/ComponentsState';
import { BreadCrumbsAGV } from '../../settings/BreadCrumbSettings';
import { ApiSettings } from '../../../../boot/settings';
import { RouteService } from 'src/modules/wgo/services';
import { getDrawerItems } from 'src/modules/wgo/settings/LeftDrawerSettings';
import { OpengarPaths } from 'src/modules/wgo/settings/ApiSettings';
import {
  IListItemNavigationCallBack,
  IListSeparator,
  INavigationTo,
  INotify
} from 'src/modules/wgo/models';
import { IBreadCrumbItem } from 'src/modules/wgo/models/IBreadCrumbItem';

@Component({
  components: { EditProfile, LeftDrawer, BreadCrumbs, UserMenu }
})
export default class AGVAdminLayout extends Vue {
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
  itemsDrawer: (IListItemNavigationCallBack | IListSeparator)[] = [];
  breadCrumbsItem: INavigationTo[];
  userMenuItems: IListItemNavigationCallBack[];
  title = 'Assemblea Genitori Vezia Amministrazione';

  @Prop() itemsPaths!: IBreadCrumbItem[];

  constructor() {
    super();
    this.routerService = new RouteService(this.$router);

    this.getItemsDrawer();
    this.breadCrumbsItem = BreadCrumbsAGV;
    this.userMenuItems = [];
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
  getItemsDrawer() {
    this.itemsDrawer = this.itemsPaths
      ? getDrawerItems(this.routerService, this.itemsPaths)
      : [];
  }

  async mounted() {
    await this.loadUserLogged();
    this.getItemsDrawer();
    if (!this.userLoged) {
      this.logoutUser();
    }
  }
}
</script>
