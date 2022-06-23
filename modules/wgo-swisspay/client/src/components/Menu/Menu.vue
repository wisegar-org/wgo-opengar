<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" :persistent="persistent" position="top" transition-duration="100">
    <q-card class="q-dialog-plugin my-menu-class" style="width: 450px">
      <q-item class="q-py-md q-px-sm q-pl-md">
        <q-item-section top class="self-center">
          <div class="text-h6 text-left">Menu</div>
        </q-item-section>
        <q-item-section top side class="self-center">
          <q-btn flat dense icon="close" @click="onDialogCancel" />
        </q-item-section>
      </q-item>
      <q-card-section class="q-pa-sm row q-bottom-sheet--grid fit scroll" style="max-height: 80vh">
        <div class="row items-stretch justify-start fit">
          <div
            v-for="(item, index) of links"
            :key="`menuItems-${getId(item)}-${index}`"
            :class="getClass(item)"
            @click="() => goToPath(item)"
          >
            <template v-if="item.type === 'item'">
              <div class="q-focus-helper"></div>
              <q-icon :color="getColor(item)" :name="item.icon" />
              <div>{{ item.label }}</div>
            </template>
            <template v-else>
              <q-separator class="" />
            </template>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { PropType, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { RouteService } from '../../../../../wgo-base/core/services/RouteService';
import { IMenuItem, IMenuSeparator, MenuListItem } from '../models';

export default defineComponent({
  name: 'Menu',
  components: {},
  props: {
    links: {
      type: Array as PropType<MenuListItem[]>,
      default: [],
    },
    persistent: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
    const router = useRouter();
    const routeService = new RouteService(router);

    return {
      routeService,
      dialogRef,
      onDialogHide,
      onDialogOK,
      onDialogCancel,
    };
  },
  methods: {
    goToPath(item: MenuListItem) {
      if (item.type === 'item') {
        this.routeService.goTo(item.link);
        this.onDialogHide();
      }
    },
    getId(item: MenuListItem) {
      return (item as any).id || 0;
    },
    getColor(item: MenuListItem) {
      return (item as any).color || 'black';
    },
    getClass(item: MenuListItem) {
      return item.type === 'item'
        ? 'q-bottom-sheet__item q-hoverable q-focusable cursor-pointer relative-position q-bottom-sheet--grid q-ma-none'
        : 'col-12';
    },
  },
  emits: [...useDialogPluginComponent.emits],
});
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .my-menu-class {
    position: absolute;
    left: 0;
    border-radius: 0 0 0.3rem 0.3rem !important;
  }
}

@media screen and (min-width: 601px) {
  .my-menu-class {
    position: absolute;
    left: 40px;
    top: 40px;
    border-radius: 0.3rem !important;
  }
}
</style>
