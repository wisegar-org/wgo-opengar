<template>
  <div class="q-px-md" style="width: 100%">
    <q-table
      bordered
      flat
      title=""
      :data="itemsList"
      :columns="columns"
      row-key="name"
      hide-no-data
      hide-header
      hide-pagination
      virtual-scroll
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      style="max-height: 250px"
    >
      <template v-slot:top class="pepe2">
        <div
          class="row q-col-gutter-none justify-between q-pa-none"
          style="width: 100%"
        >
          <div class="self-center">
            {{ title }}
          </div>
        </div>
      </template>
      <template v-slot:body-cell-buttons="props">
        <q-td :props="props">
          <div>
            <DownloadButton :item="props.row" :showLoading="showLoading" />
          </div>
        </q-td>
      </template>
      <template v-slot:loading>
        <Loader :loading="true" />
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ColumnsMediaList } from './ColumnsMediaList';
import DownloadButton from '../DownloadButton/DownloadButton.vue';
import { MediaListRow } from 'src/modules/finance';

@Component({
  components: {
    DownloadButton
  }
})
export default class MediaListViewer extends Vue {
  @Prop({ default: 'Media List' }) title!: string;
  @Prop({ default: [] }) items!: MediaListRow[];
  @Prop() showLoading!: (value: boolean) => unknown;
  columns = ColumnsMediaList;
  pagination = {
    rowsPerPage: 0
  };

  itemsList: MediaListRow[] = this.items;
}
</script>

<style scoped></style>
