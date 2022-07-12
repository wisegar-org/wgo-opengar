<template>
  <div>
    <div ref="placeholder" style="height: 1px"></div>
    <Table
      :title="translations.TITLE"
      :data="Object.values(tranStore.translations)"
      :schema="schema"
      :height="componentHeight"
    />
    <q-file
      @input="
        (val) => {
          importTranslations(val);
        }
      "
      accept=".csv"
      :multiple="false"
      :ref="id_input"
      style="display: none"
    />
    <TranslationDialog
      :translation="selectedTranslation"
      :open="open"
      :tranStore="tranStore"
      :langStore="langStore"
      @close="closeDetails"
      @onSet="onSet"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { TranslationStore } from "../../models/TranslationStore";
import Table from "../../../core/components/Table/Table.vue";
import { getTranslationListSchema } from "./TranslationListSchema";
import { BaseResizeComponent } from "../../../core/components/BaseComponents";
import { ITableLeftButton, ITableRowButton } from "../../../core/models/Table";
import { ITranslationModel } from "../../models";
import TranslationDialog from "./TranslationDialog.vue";
import { LanguageStore } from "../../../language/models/LanguageStore";
import { translations } from "../../models/translations";
import { translations as transBase } from "../../../core/models";
import { saveAs } from "file-saver";

export default defineComponent({
  name: "TranslationList",
  components: {
    Table,
    TranslationDialog,
  },
  props: {
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    langStore: { type: Object as PropType<LanguageStore>, required: true },
  },
  data() {
    const resizeComponent = new BaseResizeComponent();
    const { componentHeight, addResize, removeResize, resizeTable } =
      resizeComponent;

    const fnAction = (row: any) => {
      this.showDetails(row);
      console.log("click on", row);
    };
    const rowBtns: ITableRowButton[] = [
      {
        icon: "edit",
        tooltip: transBase.EDIT,
        fnAction,
      },
    ];
    const exportTranslations = async () => {
      const result = await this.tranStore.exportTranslations({
        languagesId: [this.langStore.selectedLang.id],
      });
      if (result) {
        debugger;
        const fileUrl = `data:${"text/plain"};base64,${result || ""}`;
        saveAs(fileUrl, "translations.csv");
      }
    };
    const importTranslations = () => {
      (this.$refs[this.id_input] as any).pickFiles();
    };
    const leftBtns: ITableLeftButton[] = [
      {
        label: "",
        icon: "add",
        color: "primary",
        tooltip: transBase.ADD,
        fnAction: () =>
          fnAction({
            key: "",
            value: "",
            languageId: this.langStore.selectedLang.id,
          }),
      },
      {
        label: "",
        icon: "cloud_upload",
        color: "primary",
        tooltip: transBase.IMPORT,
        fnAction: importTranslations,
      },
      {
        label: "",
        icon: "cloud_download",
        color: "primary",
        tooltip: transBase.EXPORT,
        fnAction: exportTranslations,
      },
    ];
    return {
      selectedTranslation: {} as ITranslationModel,
      open: false,
      componentHeight,
      addResize,
      removeResize,
      resizeTable,
      schema: getTranslationListSchema(this.tranStore, leftBtns, rowBtns),
      translations: translations,
      id_input: "upload-button-" + Math.random().toString(36).substring(2, 10),
    };
  },
  methods: {
    async loadTranslations() {
      this.tranStore;
    },
    showDetails(row: ITranslationModel) {
      this.selectedTranslation = row;
      this.open = true;
    },
    closeDetails() {
      this.open = false;
    },
    onResize() {
      this.resizeTable(this.$refs.placeholder as HTMLElement);
    },
    onSet() {
      this.$emit("onSet");
    },
    async importTranslations(file: any) {
      const formData = {
        file: file.target.files[0],
      };
      const result = await this.tranStore.importTranslations(formData);
      if (result) {
        await this.tranStore.loadAllTranslation();
      }
    },
  },
  async created() {
    this.$nextTick(() => {
      this.addResize(this.onResize);
    });
    // await this.tranStore.loadAllTranslation();
  },
  async unmounted() {
    this.removeResize(this.onResize);
  },
  emits: ["onSet"],
});
</script>
