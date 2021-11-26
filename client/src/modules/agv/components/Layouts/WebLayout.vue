<template>
  <q-toolbar>
    <q-avatar @click="goToHome" class="cursor-pointer">
      <img src="images/favicon.png" />
    </q-avatar>
    <q-toolbar-title>
      <div class="cursor-pointer" @click="goToHome" style="width: fit-content">
        {{ title }}
      </div>
    </q-toolbar-title>

    <q-tabs shrink>
      <q-route-tab
        v-for="(path, key) in menuList"
        :key="'webMenu-' + key"
        :name="path.name"
        :label="path.name"
        class="q-px-md"
        :to="path.url"
      />
    </q-tabs>

    <!-- <q-btn
      unelevated
      v-for="(path, key) in menuList"
      :key="'webMenu-' + key"
      flat
      class="q-px-md"
      :to="path.url"
      >{{ path.name }}</q-btn
    > -->
  </q-toolbar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IPath } from '../../settings/ApiSettings';

@Component({})
export default class WebLayout extends Vue {
  @Prop() title!: string;
  @Prop() menuList!: IPath[];

  goToHome() {
    if (this.$route.path !== '/') {
      void this.$router.push('/');
    }
  }
}
</script>
