<template>
  <div>
    <div ref="placeholder" style="height: 1px"></div>
    <Table
      title="Languages"
      :data="langStore.allLangs"
      :schema="schema"
      :height="componentHeight"
    />
    <LanguageDialog
      :language="selectedLang"
      :open="open"
      :langStore="langStore"
      @close="closeDetails"
      @create="onCreate"
      @edit="onEdit"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { LanguageStore } from "../../models/LanguageStore";
import Table from "../../../core/components/Table/Table.vue";
import { getLanguageListSchema } from "./LanguageListSchema";
import { BaseResizeComponent } from "../../../core/components/BaseComponents";
import { ITableLeftButton, ITableRowButton } from "../../../core/models/Table";
import { ILanguageModel } from "../../models";
import LanguageDialog from "./LanguageDialog.vue";

export default defineComponent({
  name: "LanguageList",
  components: {
    Table,
    LanguageDialog,
  },
  props: {
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
        fnAction: () => fnAction({ code: "", enabled: false, default: false }),
      },
    ];
    return {
      selectedLang: {} as ILanguageModel,
      open: false,
      componentHeight,
      addResize,
      removeResize,
      resizeTable,
      schema: getLanguageListSchema(leftBtns, rowBtns),
    };
  },
  methods: {
    async loadLanguages() {
      this.langStore;
    },
    showDetails(row: ILanguageModel) {
      this.selectedLang = row;
      this.open = true;
    },
    closeDetails() {
      this.open = false;
    },
    onResize() {
      this.resizeTable(this.$refs.placeholder as HTMLElement);
    },
    onCreate() {
      this.$emit("create");
    },
    onEdit() {
      this.$emit("edit");
    },
  },
  async created() {
    this.$nextTick(() => {
      this.addResize(this.onResize);
    });
    await this.langStore.loadAllLanguage();
  },
  async unmounted() {
    this.removeResize(this.onResize);
  },
  emits: ["create", "edit"],
});
</script>
