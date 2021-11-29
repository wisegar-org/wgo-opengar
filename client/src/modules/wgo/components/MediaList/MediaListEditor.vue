<template>
  <div class="q-px-md" style="width: 100%">
    <q-table
      bordered
      flat
      dense
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
      <template v-slot:top>
        <div
          class="row q-col-gutter-none justify-between q-pa-none"
          style="width: 100%"
        >
          <div class="self-center">
            {{ title }}
          </div>
          <div>
            <UploadButton
              :multiple="true"
              :addedFiles="e => addedFiles(e)"
              :showLoading="showLoading"
            />
          </div>
        </div>
      </template>
      <template v-slot:body-cell-buttons="props">
        <q-td :props="props">
          <div>
            <q-btn
              unelevated
              padding="xs"
              :color="props.row.delete ? 'red' : 'primary'"
              :icon="props.row.delete ? 'clear' : 'done'"
              @click="() => deleteFile(props.row)"
            />
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
import UploadButton from '../../components/UploadButton/UploadButton.vue';
import { MediaResponseGql } from '../../../../graphql';
import { MediaListRow } from '../../../finance';

export interface MediaListRowCheck extends MediaListRow {
  delete: boolean;
}

@Component({
  components: {
    UploadButton
  }
})
export default class MediaListEditor extends Vue {
  @Prop({ default: 'Media List' }) title!: string;
  @Prop({ default: () => [] }) items!: MediaListRow[];
  @Prop() addItems!: (files: number[]) => unknown;
  @Prop() changeValue!: (items: MediaListRow[]) => unknown;
  @Prop() showLoading!: (value: boolean) => unknown;
  columns = ColumnsMediaList;
  // itemsList = this.items;
  itemsList: MediaListRowCheck[] = this.items.map(obj => ({
    ...obj,
    delete: false
  }));
  pagination = {
    rowsPerPage: 0
  };

  deleteFile(row: MediaListRowCheck) {
    row.delete = !row.delete;
    this.fireAddItems();
  }

  fireAddItems() {
    this.addItems(
      this.itemsList.filter(item => !item.delete).map(item => item.id)
    );
  }

  addedFiles(items: MediaResponseGql[]) {
    items.forEach(item => {
      this.itemsList.push(<MediaListRowCheck>{
        displayName: item.displayName,
        fileName: item.fileName,
        type: item.mimetype,
        id: item.id,
        delete: false
      });
    });
    this.fireAddItems();
  }

  created() {
    this.fireAddItems();
  }
}
</script>
