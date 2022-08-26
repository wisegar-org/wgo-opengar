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
        ref="editorRef"
        @paste="onPaste"
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
  methods: {
    onPaste(evt: any) {
      // Let inputs do their thing, so we don't break pasting of links.
      if (evt.target.nodeName === "INPUT") return;
      let text, onPasteStripFormattingIEPaste;
      evt.preventDefault();
      evt.stopPropagation();
      if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
        text = evt.originalEvent.clipboardData.getData("text/plain");
        (this.$refs.editorRef as any).runCmd("insertText", text);
      } else if (evt.clipboardData && evt.clipboardData.getData) {
        text = evt.clipboardData.getData("text/plain");
        (this.$refs.editorRef as any).runCmd("insertText", text);
      } else if (
        (window as any).clipboardData &&
        (window as any).clipboardData.getData
      ) {
        if (!onPasteStripFormattingIEPaste) {
          onPasteStripFormattingIEPaste = true;
          (this.$refs.editorRef as any).runCmd("ms-pasteTextOnly", text);
        }
        onPasteStripFormattingIEPaste = false;
      }
    },
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
