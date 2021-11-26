<template>
  <q-select
    v-model="model"
    use-input
    outlined
    :clearable="clearable"
    stretch
    class="q-pa-0"
    dense
    flat
    input-debounce="0"
    :label="label"
    :options="filteredOptions"
    :rules="[validateFn]"
    @filter="filterFunc"
    style="width: 100%;"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';

import { Dictionary } from '../models/models';

@Component({})
export default class FilterSelect extends Vue {
  @Prop({ required: true }) options!: Dictionary[];
  @Prop() label!: string;
  @Prop({ default: 'label' }) filterProp!: string;
  @Prop() value!: Dictionary;
  @Prop({ default: true }) clearable!: boolean;
  @Prop({ default: () => true || 'default' }) validateFn!: (
    value: unknown
  ) => unknown;

  filteredOptions: Dictionary[];
  model: Dictionary | null;

  constructor() {
    super();
    this.filteredOptions = this.filterOptions('');
    this.model = this.value
      ? { ...this.value, label: this.value[this.filterProp] }
      : null;
  }

  filterFunc(val: string, update: (func: () => unknown) => unknown) {
    update(() => {
      const needle = val.toLowerCase();
      this.filteredOptions = this.filterOptions(needle);
    });
  }

  filterOptions(val: string) {
    return this.options
      .filter(item => {
        if (this.filterProp in item) {
          return item[this.filterProp].toLowerCase().indexOf(val) > -1;
        }
        return -1;
      })
      .map(obj => {
        return { ...obj, label: obj[this.filterProp] };
      });
  }

  @Watch('model')
  @Emit('onChange')
  onChange() {
    return this.model;
  }
}
</script>

<style scoped>
.q-field--with-bottom {
  padding-bottom: 0px;
}
</style>
