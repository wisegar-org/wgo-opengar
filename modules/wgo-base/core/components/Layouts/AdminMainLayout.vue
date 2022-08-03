<template>
  <q-layout view="hHh Lpr lff">
    <q-header>
      <q-toolbar>
        <LeftDrawer
          :items="menuItems"
          :authStore="authStore"
          :tranStore="tranStore"
          :routeService="routeService"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { AuthStore } from "../../../authentication/models/AuthStore";
import { TranslationStore } from "../../../translation/models/TranslationStore";
import { MenuListItem } from "../../models/Menu";
import { RouteService } from "../../services/RouteService";
import LeftDrawer from "../Menu/LeftDrawer.vue";

export default defineComponent({
  name: "AdminMainLayout",
  props: {
    menuItems: {
      type: Array as PropType<MenuListItem[]>,
      default: [],
    },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    authStore: { type: Object as PropType<AuthStore>, required: true },
    routeService: { type: Object as PropType<RouteService>, required: true },
  },
  components: {
    LeftDrawer,
  },
  setup() {},
});
</script>
