<template>
  <q-card flat bordered class="card_border_editor">
        <label class="q-pa-md q-field__label no-pointer-events absolute ellipsis q-field--dense q-field--float card_label_editor_config">
          {{label}}
        </label>
        <q-card-section class="visor_editor_text overflow-auto">
          <div v-html="text" />
        </q-card-section>
      </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class VisorEditor extends Vue {
  @Prop({ required: true }) text!: string;
  @Prop() label!: string;

  constructor() {
    super();
    this.text = this.text || '';
  }
}
</script>

<style scoped>
.card_border_editor::before {
  border: 1px dashed;
  border-color: rgba(0, 0, 0, 0.24);
  width: 100%;
}
.card_border_editor:hover {
  border: 1px dashed;
  border-color: rgba(0, 0, 0, 1);
  width: 100%;
}
.card_label_editor_config {
  position: absolute;
  transform: translateY(-30%) scale(0.75);
  font-size: 14px;
  top: 10px;
}
.visor_editor_text {
  max-height: 150px;
}
</style>