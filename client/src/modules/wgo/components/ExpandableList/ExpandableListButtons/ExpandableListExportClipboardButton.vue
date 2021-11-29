<template>
  <q-btn flat dense color="primary" @click="exportExcel" icon="content_copy"
    ><q-tooltip>Copy data</q-tooltip></q-btn
  >
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ListItem, PropToEdit } from '../models';
import { ExpandableListExportClipboard } from '../ExpandableListExports';

@Component({})
export default class ExpandableListExportClipboardButton extends Vue {
  @Prop({ default: () => [] }) items!: ListItem[];
  @Prop({ default: () => [] }) propsEditor!: PropToEdit[];

  async exportExcel() {
    const text = ExpandableListExportClipboard(this.items, this.propsEditor);
    await navigator.clipboard.writeText(text);
    this.$q.notify({
      color: 'positive',
      textColor: 'white',
      icon: 'cloud_done',
      position: 'top',
      message: 'Dati copiati negli appunti'
    });
  }
}
</script>
