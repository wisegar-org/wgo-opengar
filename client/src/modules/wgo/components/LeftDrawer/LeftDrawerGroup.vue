<template>
  <q-list>
    <q-item
      clickable
      v-ripple
      @click="showSubMenu"
      :class="!minState ? 'q-pl-md' : 'q-pl-none'"
      :style="getBorderStyle()"
    >
      <q-item-section v-show="item.icon" avatar>
        <q-icon :name="item.icon" :color="getColorStyle()" />
      </q-item-section>
      <q-item-section :class="getLabelStyle()">
        {{ item.label }}
      </q-item-section>
      <q-item-section avatar>
        <q-icon
          :name="item.status ? 'expand_less' : 'expand_more'"
          :color="getColorStyle()"
        />
      </q-item-section>
    </q-item>
    <OLeftDrawerList
      v-show="!!subMenu"
      :items="item.items"
      :class="!minState ? 'q-pl-md' : 'q-pl-none'"
    />
  </q-list>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IListGroup, isListActive } from '../../models';
import { Getter } from 'vuex-class';
import { colors } from 'quasar';
import {
  componentsGettedKeys,
  componentsNamespace
} from '../../store/ComponentsState';

@Component({
  components: {
    OLeftDrawerList: () => import('./LeftDrawerList.vue')
  }
})
export default class OLeftDrawerGroup extends Vue {
  @Prop() readonly item!: IListGroup;
  @Getter(componentsGettedKeys.getLeftDrawerMinState, {
    namespace: componentsNamespace
  })
  minState!: boolean;
  primary = colors.getBrand('primary');

  subMenu = false;

  constructor() {
    super();
    if (!this.item.status) this.item.status = false;
    this.subMenu = this.item.status;
  }

  showSubMenu() {
    this.item.status = !this.item.status;
    this.subMenu = !this.subMenu;
  }

  isActiveRoute() {
    return isListActive(this.$route.path || '', this.item.items);
  }

  getBorderStyle() {
    return this.isActiveRoute()
      ? `border-right: 5px solid ${this.primary};`
      : '';
  }

  getColorStyle() {
    return this.isActiveRoute() ? 'primary' : 'black';
  }

  getLabelStyle() {
    return this.isActiveRoute() ? 'text-primary' : '';
  }
}
</script>
