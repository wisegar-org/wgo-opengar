<template>
  <q-drawer
    v-model="showDrawer"
    :width="300"
    :breakpoint="500"
    :mini="!show || minState"
    bordered
    content-class="bg-grey-3 hide-scrollbar"
    v-if="!loading && items && Object.keys(translationsContent).length > 0"
  >
    <q-scroll-area v-if="!loading" class="fit">
      <q-list>
        <q-item v-if="userLogged" clickable @click="toogleMinState">
          <div class="column full-width">
            <div class="row justify-center full-width">
              <q-avatar class="shadow-2" :size="minState ? '32px' : '72px'">
                <img src="../../../../assets/profile-user.svg" />
              </q-avatar>
            </div>
            <div
              class="text-subtitle1 row justify-center full-width"
              style="white-space: nowrap"
              v-if="!minState"
            >
              {{ userLogged.email }}
            </div>
          </div>
        </q-item>
        <q-separator v-if="userLogged" />
        <LeftDrawerList :items="items" />
      </q-list>
    </q-scroll-area>
    <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
      <q-btn
        dense
        round
        unelevated
        color="accent"
        icon="chevron_left"
        @click="
          () => {
            setMinState(true);
          }
        "
      />
    </div>
  </q-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';
import {
  IListSeparator,
  IListItemNavigationCallBack,
  IListItem
} from '../../models';
import { UserLogged } from '../../models/models';
import {
  componentsGettedKeys,
  componentsSettedKeys,
  componentsNamespace,
  componentsActionsKeys
} from '../../store/ComponentsState';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../../store/Language';
import { userGetters, userNamespace } from '../../store/User';
import LeftDrawerList from './LeftDrawerList.vue';

@Component({
  components: {
    LeftDrawerList
  }
})
export default class LeftDrawer extends Vue {
  @Prop() readonly items!: (IListItemNavigationCallBack | IListSeparator)[];
  @Getter(componentsGettedKeys.getLeftDrawerOpen, {
    namespace: componentsNamespace
  })
  show!: boolean;
  @Getter(componentsGettedKeys.getLeftDrawerMinState, {
    namespace: componentsNamespace
  })
  minState!: boolean;
  @Mutation(componentsSettedKeys.setLeftDrawerMinState, {
    namespace: componentsNamespace
  })
  setLeftDrawerMinState!: (value: boolean) => void;
  @Mutation(componentsSettedKeys.setLeftDrawerOpen, {
    namespace: componentsNamespace
  })
  setLeftDrawerOpen!: (value: boolean) => void;
  @Action(componentsActionsKeys.loadLocalStorageValue, {
    namespace: componentsNamespace
  })
  loadLocalStorageValue!: () => Promise<boolean>;
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, {
    namespace: languageNamespace
  })
  translationsContent!: { [key: string]: string };

  @Getter(userGetters.getLoggedUser, { namespace: userNamespace })
  userLogged!: UserLogged;
  loading = true;

  public get showDrawer(): boolean {
    return this.show;
  }

  public set showDrawer(show: boolean) {
    if (this.show !== show) this.setLeftDrawerOpen(show);
  }

  setMinState(state: boolean) {
    this.setLeftDrawerMinState(state);
  }

  toogleMinState() {
    this.setLeftDrawerMinState(!this.minState);
  }

  isValidRole(menuItem: IListItem) {
    return menuItem.roleFilter
      ? this.userLogged &&
          (this.userLogged.isAdmin ||
            this.userLogged[menuItem.roleFilter] ||
            !!this.userLogged.roles.find(
              role => menuItem.roleFilter?.indexOf(role.name) !== -1
            ))
      : true;
  }

  getLabels(key: string) {
    return key in this.translationsContent
      ? this.translationsContent[key]
      : key;
  }

  @Watch('items')
  async registerItemsLabels() {
    // this.setLoading(true);
    // const keys: { [key: string]: boolean } = {};
    // this.items.forEach(item => {
    //   if (item.type === 'item') {
    //     if (item.label.startsWith('WGO_')) keys[item.label] = true;
    //   }
    // });
    // await this.registerTranslations(keys);
    // this.setLoading(false);
  }

  setLoading(enabled = false) {
    this.loading = enabled;
  }

  async mounted() {
    await this.loadLocalStorageValue();
    this.setLoading(false);
  }

  async created() {
    await this.registerItemsLabels();
  }
}
</script>
