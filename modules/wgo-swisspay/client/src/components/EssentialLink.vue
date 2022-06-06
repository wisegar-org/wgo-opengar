<template>
  <q-item clickable tag="a" target="_blank" @click="goTo">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { RouteService } from "../../../../wgo-base/core/services/RouteService";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
  },
  data() {
    const router = useRouter();
    return {
      routeService: new RouteService(router),
    };
  },
  methods: {
    goTo() {
      this.routeService.goTo(this.link);
    },
  },
});
</script>
