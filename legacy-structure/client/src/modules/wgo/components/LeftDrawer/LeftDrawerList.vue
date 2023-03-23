<template>
  <q-list>
    <template v-for="(menuItem, index) in items">
      <OLeftDrawerItem
        v-if="menuItem.type === 'item'"
        :key="`${id_group}-item-${index}`"
        :menuItem="menuItem"
      />
      <OLeftDrawerGroup
        v-else-if="menuItem.type === 'group'"
        :key="`${id_group}-group-${index}`"
        :item="menuItem"
      />
      <q-separator
        v-else-if="menuItem.type === 'separator'"
        :key="`${id_group}-sep-${index}`"
      />
    </template>
  </q-list>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IList } from '../../models';
import { Getter } from 'vuex-class';
import {
  componentsGettedKeys,
  componentsNamespace
} from '../../store/ComponentsState';

@Component({
  components: {
    OLeftDrawerItem: () => import('./LeftDrawerItem.vue'),
    OLeftDrawerGroup: () => import('./LeftDrawerGroup.vue')
  }
})
export default class OLeftDrawerList extends Vue {
  @Prop() readonly items!: IList[];
  @Getter(componentsGettedKeys.getLeftDrawerMinState, {
    namespace: componentsNamespace
  })
  minState!: boolean;

  subMenu = true;

  id_group =
    'group-' +
    Math.random()
      .toString(36)
      .substring(2, 10);

  showSubMenu() {
    this.subMenu = !this.subMenu;
  }

  closeSubMenu() {
    this.subMenu = false;
  }
}
</script>
