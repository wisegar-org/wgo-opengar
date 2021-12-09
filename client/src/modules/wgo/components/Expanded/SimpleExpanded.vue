<template>
  <q-expansion-item
    popup
    :group="group"
    :expand-icon-toggle="getExpandedWithIcon()"
    header-class="q-px-sm q-py-none"
    v-model="showPopup"
  >
    <template v-slot:header class="q-pa-sm q-ma-sm">
      <slot name="header">
        <q-item-section avatar>
          <q-avatar :icon="getIcon()" />
        </q-item-section>
        <slot name="labels">
          <q-item-section
            v-if="!labels || !labels.length"
            class="self-center"
            style="text-overflow: ellipsis; overflow: hidden; display: block; white-space: nowrap;"
          >
            {{ label }}
          </q-item-section>
          <q-item-section v-else class="cursor-pointer q-pl-none">
            <div class="row q-pl-none full-width">
              <template v-for="(item, index) of labels">
                <q-item-section
                  :key="item + index"
                  :class="getLabelsClass(index, item.columns)"
                  :style="getLabelsStyle(index)"
                >
                  <div
                    class="q-pl-none full-width"
                    style="text-overflow: ellipsis; overflow: hidden; display: block; white-space: nowrap;"
                  >
                    {{ isStringLabel(item) ? item : item.label }}
                    <q-tooltip
                      anchor="bottom start"
                      self="center start"
                      v-if="!isStringLabel(item)"
                    >
                      {{ item.tooltip }}
                    </q-tooltip>
                  </div>
                </q-item-section>
              </template>
            </div>
          </q-item-section>
        </slot>
      </slot>
    </template>
    <q-separator />
    <q-card>
      <q-card-section class="q-pa-none">
        <slot name="content"></slot>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class SimpleExpanded extends Vue {
  @Prop() label!: string;
  @Prop() labels!: (
    | string
    | { label: string; tooltip: string; columns: number }
  )[];
  @Prop() icon!: string;
  @Prop() group!: string;
  @Prop() iconUrl!: string;
  @Prop({ default: false }) expandIcon!: boolean;
  @Prop({ default: 4 }) maxLabels!: number;

  showPopup: boolean;
  labelsLength: number;

  /**
   *
   */
  constructor() {
    super();
    this.showPopup = false;
    this.labelsLength = (this.labels || [])
      .map(label => (typeof label === 'string' ? 1 : label.columns))
      .reduce((a, b) => (a || 1) + (b || 1), 0);
  }

  getIcon() {
    return this.iconUrl ? `img:${this.iconUrl}` : this.icon;
  }

  invertValue() {
    this.showPopup = !this.showPopup;
    return this.showPopup;
  }

  getExpandedWithIcon() {
    return this.expandIcon;
  }

  getLabelsClass(index: number, columns = 1) {
    if (this.labels.length === 1) {
      return 'col-12 col-sm-12 q-ml-none q-pl-sm';
    }
    const maxColumns = this.getDisplayInSM()
      ? Math.min(this.maxLabels, this.labelsLength)
      : 2;
    const value = !this.getDisplayInXS() ? 12 / maxColumns : 6;
    return `col-${index < 3 ? 12 : 0} col-sm-${value *
      columns} q-ml-none q-pl-sm`;
  }

  getLabelsStyle(index: number) {
    const isOnlySM = !this.getDisplayInSM();
    return index >= 3 && isOnlySM
      ? 'display: none;'
      : 'margin-left: 0 !important;';
  }
  isStringLabel(label: { label: string; tooltip: string } | string) {
    return typeof label === 'string';
  }

  getDisplayInXS() {
    return this.$q.screen.xs;
  }

  getDisplayInSM() {
    return this.$q.screen.gt.sm;
  }
}
</script>
