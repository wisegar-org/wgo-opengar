<template>
  <q-dialog
    v-model="showModal"
    persistent
    :full-height="fullHeight"
    :full-width="fullWidth"
  >
    <q-card :style="styleDialog"
      ><q-toolbar class="bg-primary text-white">
        <q-avatar v-if="getIcon()" :icon="getIcon()" />
        <q-toolbar-title>{{ title }}</q-toolbar-title>
        <q-btn
          unelevated
          icon="close"
          flat
          round
          dense
          @click="close"
          v-close-popup
        />
      </q-toolbar>
      <q-card-section>
        <slot name="content"></slot>
      </q-card-section>
    </q-card>

    <Loader :loading="loading" />
  </q-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class AddBillEditorDialog extends Vue {
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() title!: string;
  @Prop() icon!: string;
  @Prop() iconUrl!: string;
  @Prop({ default: false }) loading!: boolean;
  @Prop({ default: 'width: 800px; max-width: 90vw' }) styleDialog!: string;
  @Prop({ default: false }) fullWidth!: boolean;
  @Prop({ default: false }) fullHeight!: boolean;

  getIcon() {
    if (!this.icon && !this.iconUrl) return '';
    return this.iconUrl ? `img:${this.iconUrl}` : this.icon;
  }
}
</script>
