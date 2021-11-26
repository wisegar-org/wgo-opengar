<template>
  <div>
    <q-toolbar>
      <q-avatar @click="goToHome" class="cursor-pointer">
        <img src="images/favicon.png" />
      </q-avatar>
      <q-toolbar-title @click="goToHome" class="cursor-pointer">
        {{ title }}
      </q-toolbar-title>
      <q-btn
        unelevated
        flat
        @click="() => setShowMenu(!showMenu)"
        round
        dense
        icon="menu"
      />
    </q-toolbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { AGVPaths } from '../../settings/ApiSettings';
import { Mutation, Getter } from 'vuex-class';
import {
  componentsGettedKeys,
  componentsSettedKeys,
  agvComponentsNamespace
} from '../../store/AGVComponentsState';

@Component({})
export default class MobileLayout extends Vue {
  @Prop() title!: string;
  paths = Object.values(AGVPaths);

  @Getter(componentsGettedKeys.getMenuOpen, {
    namespace: agvComponentsNamespace
  })
  showMenu!: boolean;
  @Mutation(componentsSettedKeys.setMenuOpen, {
    namespace: agvComponentsNamespace
  })
  setShowMenu!: (showMenu: boolean) => void;

  goToHome() {
    if (this.$route.path !== '/') void this.$router.push('/');
    this.setShowMenu(false);
  }
}
</script>
