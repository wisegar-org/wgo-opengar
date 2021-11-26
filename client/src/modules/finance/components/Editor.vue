<template>
  <div class="q-pa-none q-gutter-sm">
    <q-card bordered flat class="border_component_editor">
      <q-card-section v-if="label" class="q-py-sm label_component">
        {{ label }}
      </q-card-section>
      <q-editor
        dense
        max-height="150px"
        v-model="toEdit[propToEdir]"
        min-height="5rem"
        :toolbar="[
          [
            {
              label: $q.lang.editor.align,
              icon: $q.iconSet.editor.align,
              fixedLabel: true,
              list: 'only-icons',
              options: ['left', 'center', 'right', 'justify']
            }
          ],
          ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
          ['token', 'hr', 'link', 'custom_btn'],
          ['print', 'fullscreen'],
          [
            {
              label: $q.lang.editor.formatting,
              icon: $q.iconSet.editor.formatting,
              list: 'no-icons',
              options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
            },
            {
              label: $q.lang.editor.fontSize,
              icon: $q.iconSet.editor.fontSize,
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'size-1',
                'size-2',
                'size-3',
                'size-4',
                'size-5',
                'size-6',
                'size-7'
              ]
            },
            {
              label: $q.lang.editor.defaultFont,
              icon: $q.iconSet.editor.font,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'default_font',
                'arial',
                'arial_black',
                'comic_sans',
                'courier_new',
                'impact',
                'lucida_grande',
                'times_new_roman',
                'verdana'
              ]
            },
            'removeFormat'
          ],
          ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

          ['undo', 'redo'],
          ['viewsource']
        ]"
        :fonts="{
          arial: 'Arial',
          arial_black: 'Arial Black',
          comic_sans: 'Comic Sans MS',
          courier_new: 'Courier New',
          impact: 'Impact',
          lucida_grande: 'Lucida Grande',
          times_new_roman: 'Times New Roman',
          verdana: 'Verdana'
        }"
      />
    </q-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Dictionary } from '../models/models';

@Component({})
export default class Editor extends Vue {
  @Prop({ required: true }) toEdit!: Dictionary;
  @Prop({ required: true }) propToEdir!: string;
  @Prop() label!: string;

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