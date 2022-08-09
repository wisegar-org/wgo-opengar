<template>
  <div class="q-pa-none">
    <q-card bordered flat class="border_component_editor">
      <q-card-section v-if="label" class="q-py-sm label_component">
        {{ label }}
      </q-card-section>
      <q-editor
        v-if="readonly"
        dense
        readonly
        max-height="150px"
        :toolbar="[]"
        v-model="toEdit[propToEdit]"
        min-height="5rem"
      />
      <q-editor
        v-else
        dense
        max-height="150px"
        v-model="toEdit[propToEdit]"
        min-height="5rem"
      />
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { StringDictionary } from "../../models";

export default defineComponent({
  name: "Editor",
  props: {
    toEdit: { type: Object as PropType<StringDictionary>, required: true },
    propToEdit: { type: String, required: true },
    label: { type: String, default: "" },
    readonly: { type: Boolean, default: false },
  },
  data() {
    this.toEdit[this.propToEdit] = this.toEdit[this.propToEdit] || "";
    return {};
  },
});
</script>

<style scoped>
.label_component {
  padding-left: 12px;
  color: rgba(0, 0, 0, 0.6);
}
.border_component_editor:hover {
  border-color: rgba(0, 0, 0, 1);
}
</style>
