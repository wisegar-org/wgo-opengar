<template>
  <div>
    <q-table
      dense
      virtual-scroll
      :row-key="mySchema.code"
      :title="title"
      :rows="filtredData"
      :columns="columns"
      @row-click="selectCode"
      :style="{ height: `${height}px` }"
      :visible-columns="visibleColumns"
      class="my-sticky-header-table"
    >
      <template v-slot:top>
        <TableTitleHeader
          :title="title"
          :searchText="searchText"
          :schema="mySchema"
          :columns="columns"
          :data="data"
          @changeColumnSelected="changeColumnSelected"
        />
      </template>

      <template v-slot:header-cell="props">
        <q-th
          :props="props"
          :style="{
            'min-width': props.col.width + 'px',
            width: props.col.width + 'px',
          }"
        >
          <div
            v-if="
              mySchema.searchStrategy &&
              mySchema.searchStrategy.type == 'header'
            "
            class="column"
          >
            <div>{{ props.col.label }}</div>
            <div
              v-if="props.col.filterable && enableFilter"
              class="row justify-between items-center"
            >
              <input
                v-if="props.col.filterable"
                :ref="props.col.name"
                autocomplete="new-password"
                class="orion-header-input"
                type="text"
                @input="onSearchInput(props.col.name)"
                @click.stop=""
              />
            </div>
            <div
              v-if="!props.col.filterable && enableFilter"
              style="min-height: 22px"
            />
          </div>
          <div
            v-if="
              !mySchema.searchStrategy ||
              mySchema.searchStrategy.type != 'header'
            "
            class="column"
          >
            <div>{{ props.col.label }}</div>
          </div>
        </q-th>
      </template>
      <template v-slot:body-cell="props">
        <TableColumns
          :schema="mySchema"
          :props="props"
          @rowSelect="onRowSelect"
        />
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { ITableColumn, ITableData, ITableSchema } from "../../models/Table";
import TableColumns from "./TableColumns.vue";
import TableTitleHeader from "./TableTitleHeader.vue";

export default defineComponent({
  name: "Table",
  props: {
    title: {
      type: String,
      default: "",
    },
    data: {
      type: Array as PropType<ITableData[]>,
      default: [],
    },
    schema: {
      type: Object as PropType<ITableSchema>,
      default: { schema: {}, title: "", code: "id" },
    },
    height: {
      type: Number,
      default: 300,
    },
  },
  components: {
    TableColumns,
    TableTitleHeader,
  },
  data() {
    const mySchema: ITableSchema = { schema: {}, title: "" };
    const columns: ITableColumn[] = [];
    const visibleColumns: string[] = [];
    const filtredData: ITableData[] = [];

    return {
      mySchema,
      columns,
      visibleColumns,
      filtredData,
      apiURL: "",
      searchText: "",
      enableFilter: false,
    };
  },
  methods: {
    setFromSchema() {
      this.mySchema = this.schema;
      this.apiURL = this.mySchema.apiURL as string;
      this.enableFilter =
        this.mySchema.searchStrategy && this.mySchema.searchStrategy.visible
          ? this.mySchema.searchStrategy.visible
          : false;
      this.columns = [];
      this.visibleColumns = [];
      for (let item in this.mySchema.schema) {
        const i = this.mySchema.schema[item];
        this.columns.push(i);
        if (i.visible) this.visibleColumns.push(i.name);
      }
    },
    selectCode(e: Event, row: ITableData) {
      this.$emit("selectCode", row);
    },
    buttonClick(clickFunction: string, row?: ITableData) {
      console.log("Click on button ", clickFunction, " on row ", row);

      this.$emit("buttonClick", {
        clickFunction: clickFunction,
        row: row,
      });
    },
    changeColumnSelected(visibleColumns: string[]) {
      this.visibleColumns = visibleColumns;
    },
    onRowSelect(row: any) {
      this.$emit("rowSelect", row);
    },
    onSearchInput(colName?: string) {
      if (colName) {
        if (this.inputSequence.indexOf(colName) == -1) {
          this.inputSequence.push(colName);
        }
        const input = this.$refs[colName] as HTMLInputElement;
        if (input.value) {
        } else {
          this.inputSequence.splice(this.inputSequence.indexOf(colName), 1);
        }
      }

      let tmpData: ITableData[] = this.data.map((item) => ({ ...item }));
      this.searchText = "";
      for (let i = 0; i < this.inputSequence.length; i++) {
        const colName = this.inputSequence[i];
        const input = this.$refs[colName] as HTMLInputElement;
        const inputValue = input.value;
        const column = this.mySchema.schema[colName];
        this.searchText += `${column.label} contiene <${inputValue}> e `;
        tmpData = tmpData.filter((v) => {
          let c;
          if (typeof column.field == "string") {
            c = v[column.field];
          } else if (typeof column.field == "function") {
            c = column.field(v);
          }
          if (c && typeof c == "string") {
            c = c.toLowerCase();
          } else {
            c = c.toString().toLowerCase();
          }
          if (c.indexOf(inputValue.toLowerCase()) != -1) return true;
          return false;
        });
      }
      this.searchText = this.searchText.slice(0, -2);
      this.filtredData = tmpData;
    },
  },
  emits: ["selectCode", "buttonClick", "rowSelect"],
  mounted() {
    if (this.schema) {
      this.setFromSchema();
      this.filtredData = this.data;
    }
  },
  watch: {
    data() {
      this.onSearchInput();
    },
    schema() {
      this.setFromSchema();
    },
  },
});
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */

  .q-table__top
    border-bottom: 1px solid #ccc

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
    .q-table__sort-icon--left
      position: absolute
      top: 4px
      right: 10px
    .q-table__sort-icon--right
      position: absolute
      top: 4px
      left:8px
    .q-table__sort-icon--center
      position: absolute
      top: 4px
      right: 10px
    top: 0


  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  .orion-header-input
    width: 100%
    border: 1px solid rgba(0,0,0,.1)
    &:focus
      outline: 1px solid $primary
</style>
