<template>
  <div
    :style="{
      height: height,
      border: '1px solid #695656',
    }"
  >
    <ckeditor
      v-model="text"
      :editor="editor"
      @ready="onReady"
      :config="editorConfig"
      ref="editor"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { UploadAdapter } from "./UploadAdapter";
const DecoupledEditor = require("@ckeditor/ckeditor5-build-decoupled-document");

export default defineComponent({
  name: "QCKEditor",
  props: {
    height: {
      type: String,
      default: "",
    },
    urlApi: { type: String, required: true },
    required: { type: Boolean, required: false, default: false },
  },
  model: {
    prop: "text",
    event: "change",
  },
  data() {
    return {
      text: "",
      editor: DecoupledEditor,
      editorConfig: {},
    };
  },
  methods: {
    onReady(editor: any) {
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
      editor.plugins.get("FileRepository").createUploadAdapter = (
        loader: any
      ) => {
        return new UploadAdapter(loader, this.urlApi);
      };
    },
    validate() {
      return !this.required || !!this.text;
    },
  },
});
</script>

<style scoped>
.ck-content {
  height: calc(100% - 40px);
}
.cke_chrome {
  border: 1px solid #695656;
}
</style>
