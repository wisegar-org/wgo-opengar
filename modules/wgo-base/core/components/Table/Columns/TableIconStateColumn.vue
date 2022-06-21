<template>
  <div
    :style="{
      'min-width': props.col.width + 'px',
      width: props.col.width + 'px',
    }"
  >
    <div>
      <q-btn
        size="sm"
        flat
        round
        :color="props.col.extra.icons[props.value].color"
        :icon="props.col.extra.icons[props.value].icon"
      >
        <q-menu auto-close>
          <q-list style="min-width: 100px">
            <div v-close-popup v-for="(v, k) in props.col.extra.icons" :key="k">
              <q-item
                clickable
                @click="doAction(props.col.extra.action, props, k)"
              >
                <q-item-section avatar>
                  <q-icon :color="v.color" :name="v.icon" />
                </q-item-section>
                <q-item-section>{{ v.label }}</q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "TableIconStateColumn",
  props: ["props"],
  methods: {
    doAction(action: string | unknown, props: unknown, extra: unknown = null) {
      this.$emit("action", action, props, extra);
    },
  },
  emits: ["action"],
});
</script>
