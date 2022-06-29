<template>
  <div>
    <div ref="placeholder" style="height: 1px"></div>
    <Table
      title="Translations"
      :data="Object.values(tranStore.translations)"
      :schema="schema"
      :height="componentHeight"
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
        fnAction,
      },
    ];
    const leftBtns: ITableLeftButton[] = [
      {
        label: "",
        icon: "add",
        color: "primary",
        fnAction: () =>
          fnAction({
            key: "",
            value: "",
            languageId: this.langStore.selectedLang.id,
          }),
      },
    ];
    return {
      selectedTranslation: {} as ITranslationModel,
      open: false,
      componentHeight,
      addResize,
      removeResize,
      resizeTable,
      schema: getTranslationListSchema(leftBtns, rowBtns),
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
      this.$emit("create");
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
