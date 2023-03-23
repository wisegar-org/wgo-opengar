<template>
  <div class="q-pa-md" style="width: 100%">
    <q-table
      bordered
      flat
      :title="title"
      :data="dataToShow"
      :columns="columns"
      row-key="id"
      :loading="loading"
      hide-pagination
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class TableReview extends Vue {
  @Prop() title!: string;
  @Prop() data!: unknown[];
  @Prop() columns!: unknown[];
  loading = false;

  dataToShow = (this.data || []).slice(0, 5);
  @Watch('data')
  setData() {
    this.dataToShow = (this.data || []).slice(0, 5);
  }

  constructor() {
    super();
    this.setData();
  }
}
</script>

<style scoped>
.q-toolbar {
  padding: 0px;
}
</style>
