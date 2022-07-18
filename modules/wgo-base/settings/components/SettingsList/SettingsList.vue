<template>
  <div>
    <div ref="placeholder" style="height: 1px"></div>
    <Table
      :title="translations.TITLE"
      :data="dataSettings"
      :schema="schema"
      :height="componentHeight"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import Table from "../../../core/components/Table/Table.vue";
import { getSettingsListSchema } from "./SettingsListSchema";
import { BaseResizeComponent } from "../../../core/components/BaseComponents";
import { ITableLeftButton, ITableRowButton } from "../../../core/models/Table";
import { TranslationStore } from "../../../translation/models/TranslationStore";
import { translations } from "../../models/translations";
import { translations as tranBase } from "../../../core/models";
import { ISettingsModel } from "../../models";

export default defineComponent({
  name: "SettingsList",
  components: {
    Table,
  },
  props: {
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
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
        tooltip: tranBase.EDIT,
      },
    ];
    const leftBtns: ITableLeftButton[] = [];
    const schema = getSettingsListSchema(this.tranStore, leftBtns, rowBtns);
    schema.rowDblClick = fnAction;
    const dataSettings: ISettingsModel[] = [];
    return {
      selectedSettings: {} as ISettingsModel,
      open: false,
      componentHeight,
      addResize,
      removeResize,
      resizeTable,
      dataSettings,
      schema: schema,
      translations,
      loading: false,
    };
  },
  methods: {
    async loadSettings() {
      this.loading = true;
      this.dataSettings = [];
      this.loading = false;
    },
    showDetails(row: ISettingsModel) {
      this.selectedSettings = row;
      this.open = true;
    },
    closeDetails() {
      this.open = false;
    },
    onResize() {
      this.resizeTable(this.$refs.placeholder as HTMLElement);
    },
    onSuccess(msg: string) {
      this.$emit("success", msg);
    },
  },
  async created() {
    this.$nextTick(() => {
      this.addResize(this.onResize);
    });
    await this.loadSettings();
  },
  async unmounted() {
    this.removeResize(this.onResize);
  },
  emits: ["success"],
});
</script>
