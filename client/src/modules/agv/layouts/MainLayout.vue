<template>
  <q-layout view="hHh Lpr fff" style="display: flex; justify-content: center;">
    <q-header>
      <WebLayout
        v-if="$q.screen.width >= 1024"
        :title="title"
        :menuList="paths"
      />
      <MobileLayout v-else :title="title" />
    </q-header>
    <q-footer>
      <div class="text-center q-toolbar__title q-pa-sm">
        Copyright © Assemblea Genitori Vezia 2021
      </div>
    </q-footer>
    <q-page-container class="q-pa-sm" style="width: 100%; max-width: 1800px;">
      <LogoLayout v-if="$q.screen.width >= 1024" />
      <MenuLayout :menuList="paths" />
      <router-view class="q-py-xl" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LogoLayout from '../components/Layouts/LogoLayout.vue';
import WebLayout from '../components/Layouts/WebLayout.vue';
import MobileLayout from '../components/Layouts/MobileLayout.vue';
import MenuLayout from '../components/Layouts/MenuLayout.vue';
import { IPath, AGVPaths } from '../settings/ApiSettings';

@Component({
  components: {
    LogoLayout,
    WebLayout,
    MobileLayout,
    MenuLayout
  }
})
export default class MainLayout extends Vue {
  title = 'Assemblea Genitori Vezia';
  paths: IPath[] = Object.values(AGVPaths);

  constructor() {
    super();
  }
}
</script>

<style lang="stylus">
$primary = #ACCF5A

:root
  --q-color-primary = #ACCF5A
</style>
