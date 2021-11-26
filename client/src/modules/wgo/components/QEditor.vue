<template>
  <div class="q-pa-none">
    <q-card bordered flat class="border_component_editor">
      <q-card-section v-if="label" class="q-py-sm label_component">
        {{ label }}
      </q-card-section>
      <q-editor
        v-if="readonly"
        dense
        readonly
        max-height="150px"
        :toolbar="[]"
        v-model="toEdit[propToEdir]"
        min-height="5rem"
      />
      <q-editor
        v-else
        dense
        max-height="150px"
        v-model="toEdit[propToEdir]"
        min-height="5rem"
      />
    </q-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class QEditorToolbar extends Vue {
  @Prop({ required: true }) toEdit!: { [key: string]: string };
  @Prop({ required: true }) propToEdir!: string;
  @Prop() label!: string;
  @Prop({ default: false }) readonly!: boolean;

  constructor() {
    super();
    this.toEdit[this.propToEdir] = this.toEdit[this.propToEdir] || '';
  }
}
</script>

<style scoped>
.label_component {
  padding-left: 12px;
  color: rgba(0, 0, 0, 0.6);
}
.border_component_editor:hover {
  border-color: rgba(0, 0, 0, 1);
}
</style>
