<template>
  <Expanded ref="expanded" :group="group" :expandIcon="true">
    <template slot="header">
      <q-item-section
        v-if="getIcon() && !getDisplayInXS()"
        avatar
        class="col-auto cursor-pointer"
        @click="clickInHeader"
      >
        <q-avatar :icon="getIcon()" />
      </q-item-section>
      <q-item-section v-if="getDisplayInXS()" avatar class="col-auto">
        <q-btn flat unelevated color="primary" icon="more_vert" dense>
          <q-menu anchor="top right" self="top left">
            <q-list v-close-popup>
              <slot name="buttons" v-close-popup></slot>
            </q-list>
          </q-menu>
        </q-btn>
      </q-item-section>
      <q-item-section
        v-if="!labels || !labels.length"
        class="self-center cursor-pointer q-py-sm"
        style="text-overflow: ellipsis; overflow: hidden; display: block; white-space: nowrap;"
        @click="clickInHeader"
      >
        {{ label }}
      </q-item-section>
      <q-item-section
        v-else
        class="cursor-pointer q-pl-none"
        @click="clickInHeader"
      >
        <div class="row q-pl-none full-width">
          <template v-for="(item, index) of labels">
            <q-item-section
              :key="item + index"
              :class="getLabelsClass(index)"
              :style="getLabelsStyle(index)"
            >
              <div
                class="q-pl-none full-width"
                style="text-overflow: ellipsis; overflow: hidden; display: block; white-space: nowrap;"
              >
                {{ item }}
              </div>
            </q-item-section>
          </template>
        </div>
      </q-item-section>
      <q-item-section class="col-auto" v-show="!getDisplayInXS()">
        <div class="justify-end content-end row">
          <slot name="buttons"></slot>
        </div>
      </q-item-section>
    </template>
    <template slot="content">
      <slot name="content"></slot>
    </template>
  </Expanded>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Expanded from './Expanded.vue';

@Component({
  components: {
    Expanded
  }
})
export default class ExpandedToggleHeader extends Vue {
  @Prop() label!: string;
  @Prop() labels!: string[];
  @Prop() icon!: string;
  @Prop() group!: string;
  @Prop() iconUrl!: string;
  @Prop({ default: 4 }) maxLabels!: number;

  getIcon() {
    return this.iconUrl ? `img:${this.iconUrl}` : this.icon;
  }

  clickInHeader() {
    const expanded = (this.$refs.expanded as unknown) as {
      invertValue: () => unknown;
    };
    if (!!expanded && !!expanded.invertValue) expanded.invertValue();
  }

  getLabelsClass(index: number) {
    const maxColumns = this.getDisplayInSM()
      ? Math.min(this.maxLabels, this.labels.length)
      : 2;
    const value = !this.getDisplayInXS() ? 12 / maxColumns : 6;
    return `col-${index < 2 ? 12 : 0} col-sm-${value} q-ml-none q-pl-sm`;
  }

  getLabelsStyle(index: number) {
    const isOnlySM = !this.getDisplayInSM();
    return index >= 2 && isOnlySM
      ? 'display: none;'
      : 'margin-left: 0 !important;';
  }

  getDisplayInXS() {
    return this.$q.screen.xs;
  }

  getDisplayInSM() {
    return this.$q.screen.gt.sm;
  }
}
</script>
