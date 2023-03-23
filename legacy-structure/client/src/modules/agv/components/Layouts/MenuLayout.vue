<template>
  <q-drawer
    v-if="$q.screen.width < 1024"
    v-model="showMenu"
    fullWidth
    :breakpoint="0"
    overlay
    bordered
    content-class="bg-primary"
    @click="() => setShowMenu(false)"
  >
    <q-scroll-area class="fit">
      <q-tabs shrink vertical>
        <q-route-tab
          v-for="(path, key) in menuList"
          :key="'webMenu-' + key"
          :name="path.name"
          :label="path.name"
          class="q-px-md text-white"
          :to="path.url"
        />
        <q-route-tab
          v-if="isUserAdmin()"
          :name="adminRoute.name"
          :label="adminRoute.name"
          class="q-px-md text-white"
          :to="adminRoute.url"
        />
      </q-tabs>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts">
import { IPath } from '../../settings/ApiSettings';
import { Component, Vue, Prop } from 'vue-property-decorator';

import { Mutation, Getter } from 'vuex-class';
import {
  agvComponentsGettedKeys,
  agvComponentsNamespace,
  agvComponentsSettedKeys
} from '../../store/AGVComponentsState';
import { userGetters, userNamespace } from '../../../wgo/store/User';
import { UserGql } from '../../../../graphql';
import { IndexAdminRoute } from '../../../wgo/settings/RouterSettings';

@Component({})
export default class MenuLayout extends Vue {
  @Prop() menuList!: IPath[];
  @Getter(userGetters.getLoggedUser, { namespace: userNamespace })
  user!: UserGql;
  adminRoute: IPath = {
    name: 'Amministrazione',
    url: IndexAdminRoute.path
  };

  @Getter(agvComponentsGettedKeys.getMenuOpen, {
    namespace: agvComponentsNamespace
  })
  showMenu!: boolean;
  @Mutation(agvComponentsSettedKeys.setMenuOpen, {
    namespace: agvComponentsNamespace
  })
  setShowMenu!: (showMenu: boolean) => void;

  goToPath(path: string) {
    void this.$router.push(path);
    this.setShowMenu(false);
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
}
</script>
