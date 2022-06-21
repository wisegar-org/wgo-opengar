<template>
  <div>
    <q-btn
      v-for="(v, k) in props.col.extra"
      :key="k"
      size="sm"
      :flat="!v.label"
      :round="!v.label"
      :outline="!!v.label"
      :label="v.label"
      color="primary"
      :icon="v.icon"
      @click="
        () => {
          if (v.fnAction) v.fnAction(props.row);
        }
      "
    >
      <q-tooltip v-if="v.tooltip">{{ v.tooltip }}</q-tooltip>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "TableCommandColumn",
  props: ["props"],
});
</script>
