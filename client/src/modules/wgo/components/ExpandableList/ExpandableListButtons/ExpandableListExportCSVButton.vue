<template>
  <q-btn flat dense color="primary" @click="exportCSV" icon="las la-file-csv"
    ><q-tooltip>Export to CSV</q-tooltip></q-btn
  >
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ListItem, PropToEdit } from '../models';
import { ExpandableListExportCSV } from '../ExpandableListExports';

@Component({})
export default class ExpandableListExportCSVButton extends Vue {
  @Prop({ default: () => [] }) items!: ListItem[];
  @Prop({ default: () => [] }) propsEditor!: PropToEdit[];

  exportCSV() {
    ExpandableListExportCSV(this.items, this.propsEditor);
  }
}
</script>
