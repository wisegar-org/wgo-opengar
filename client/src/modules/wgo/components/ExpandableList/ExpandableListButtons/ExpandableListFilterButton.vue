<template>
  <q-btn flat dense color="primary" @click="onShowDialog" icon="filter_alt"
    ><q-tooltip>Abilita filtri</q-tooltip>
    <ExpandableListFilterDialog
      :filter="filter"
      :propsEditor="propsEditor"
      :applyFilter="applyFilter"
      :open="showFilterDialog"
      :close="() => (showFilterDialog = false)"
    />
    <q-tooltip>Set filters</q-tooltip></q-btn
  >
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ListItem, PropToEdit } from '../models';
import ExpandableListFilterDialog from '../ExpandableListFilter/ExpandableListFilterDialog.vue';

@Component({
  components: {
    ExpandableListFilterDialog
  }
})
export default class ExpandableListFilterButton extends Vue {
  @Prop({ default: () => ({}) }) filter!: ListItem;
  @Prop({ default: () => [] }) propsEditor!: PropToEdit[];
  @Prop({ default: () => {} }) applyFilter!: (filter: ListItem) => unknown;
  showFilterDialog = false;

  onShowDialog() {
    this.showFilterDialog = true;
  }
}
</script>
