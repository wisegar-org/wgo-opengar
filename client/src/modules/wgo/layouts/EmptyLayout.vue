<template>
  <q-layout view="hHh Lpr lff">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class EmptyLayout extends Vue {
  constructor() {
    super();
  }
}
</script>
