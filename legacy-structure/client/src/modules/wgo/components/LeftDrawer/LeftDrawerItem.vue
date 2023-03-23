<template>
  <q-item
    clickable
    v-ripple
    @click="() => menuItem.onClick()"
    :style="getBorderStyle()"
  >
    <q-item-section avatar>
      <q-icon :name="menuItem.icon" :color="getColorStyle()" />
    </q-item-section>
    <q-item-section :class="getLabelStyle()">
      {{ getLabels(menuItem.label) }}
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IListItemNavigationCallBack } from '../../models';
import { colors } from 'quasar';
import { Getter } from 'vuex-class';
import { languageGetters, languageNamespace } from '../../store/Language';

@Component({})
export default class OLeftDrawerItem extends Vue {
  @Getter(languageGetters.getTranslations, {
    namespace: languageNamespace
  })
  translationsContent!: { [key: string]: string };
  @Prop() menuItem!: IListItemNavigationCallBack;
  primary = colors.getBrand('primary');

  isActiveRoute() {
    if (this.menuItem.activeRoute)
      return this.menuItem.activeRoute(this.$route.path);
    return false;
  }

  getBorderStyle() {
    return this.isActiveRoute()
      ? `border-right: 5px solid ${this.primary || 'black'};`
      : '';
  }

  getColorStyle() {
    return this.isActiveRoute() ? 'primary' : 'black';
  }

  getLabelStyle() {
    return this.isActiveRoute() ? 'text-primary' : '';
  }

  getLabels(key: string) {
    return key in this.translationsContent
      ? this.translationsContent[key]
      : key;
  }
}
</script>
