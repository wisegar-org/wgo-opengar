<template>
  <q-btn
    flat
    dense
    color="primary"
    @click="exportExcel"
    icon="las la-file-excel"
    ><q-tooltip>Export to Excel</q-tooltip></q-btn
  >
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ListItem, PropToEdit } from '../models';
import { ExpandableListExportExcel } from '../ExpandableListExports';

@Component({})
export default class ExpandableListExportExcelButton extends Vue {
  @Prop({ default: () => [] }) items!: ListItem[];
  @Prop({ default: () => [] }) propsEditor!: PropToEdit[];

  exportExcel() {
    ExpandableListExportExcel(this.items, this.propsEditor);
  }
}
</script>
