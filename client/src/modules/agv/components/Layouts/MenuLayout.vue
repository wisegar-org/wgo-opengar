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
      </q-tabs>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts">
import { IPath } from '../../settings/ApiSettings';
import { Component, Vue, Prop } from 'vue-property-decorator';

import { Mutation, Getter } from 'vuex-class';
import {
  componentsGettedKeys,
  componentsSettedKeys,
  agvComponentsNamespace
} from '../../store/AGVComponentsState';

@Component({})
export default class MenuLayout extends Vue {
  @Prop() menuList!: IPath[];

  @Getter(componentsGettedKeys.getMenuOpen, {
    namespace: agvComponentsNamespace
  })
  showMenu!: boolean;
  @Mutation(componentsSettedKeys.setMenuOpen, {
    namespace: agvComponentsNamespace
  })
  setShowMenu!: (showMenu: boolean) => void;

  goToPath(path: string) {
    void this.$router.push(path);
    this.setShowMenu(false);
  }
}
</script>
