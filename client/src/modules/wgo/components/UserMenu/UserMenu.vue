<template>
  <q-btn-dropdown
    class="dropdown-user"
    v-if="!innerLoading && !!user"
    flat
    size="sm"
    color="white"
    no-caps
    :label="getEmail()"
  >
    <div class="row no-wrap">
      <div class="column full-width">
        <q-list>
          <q-item>
            <div class="column full-width">
              <div class="row justify-center full-width">
                <q-avatar class="shadow-2" size="72px">
                  <img src="../../../../assets/profile-user.svg" />
                </q-avatar>
              </div>
              <div
                class="text-subtitle1 row justify-center full-width"
                style="white-space: nowrap"
              >
                {{ getFullName() }}
              </div>
            </div>
          </q-item>
          <q-separator v-if="items && items.length > 0" />
          <template v-for="(item, index) in getItemsProp()">
            <q-item
              v-if="item.type === 'item'"
              clickable
              v-close-popup
              @click="() => item.onClick()"
              :key="item.label + index"
            >
              <q-item-section avatar>
                <q-avatar
                  size="md"
                  :icon="item.icon"
                  color="primary"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ getLabels(item.label) }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator v-else :key="index" />
          </template>
        </q-list>
      </div>
    </div>
  </q-btn-dropdown>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { UserGql } from 'src/graphql';
import { userActions, userGetters, userNamespace } from '../../store/User';
import {
  IListSeparator,
  IListItemNavigationCallBack,
  BoolDictionary
} from '../../models';
import { RouteService } from '../../services';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../../store/Language';

@Component({})
export default class UserMenu extends Vue {
  @Action(userActions.logoutUser, { namespace: userNamespace })
  logoutAction!: () => void;
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, {
    namespace: languageNamespace
  })
  translationsContent!: { [key: string]: string };
  @Getter(userGetters.getLoggedUser, { namespace: userNamespace })
  user!: UserGql;
  @Prop({ default: false }) goToHome!: boolean;
  @Prop() readonly items!: (IListItemNavigationCallBack | IListSeparator)[];
  logoutItems: (IListItemNavigationCallBack | IListSeparator)[] = [
    {
      type: 'separator'
    },
    {
      type: 'item',
      label: 'WGO_LOGOUT_LABEL',
      icon: 'exit_to_app',
      onClick: () => this.logout()
    }
  ];

  routeService: RouteService;
  innerLoading = true;

  constructor() {
    super();
    this.routeService = new RouteService(this.$router);
  }

  getEmail() {
    return this.user && this.user.email ? this.user.email : this.getFullName();
  }

  getFullName() {
    return this.user && this.user.name
      ? `${this.user.name} ${this.user.lastName}`
      : 'Profilo';
  }

  getItemsProp() {
    return this.items ? this.items.concat(this.logoutItems) : this.logoutItems;
  }

  logout() {
    this.logoutAction();
    this.goToHome
      ? this.routeService.goTo('/')
      : this.routeService.goToLoginPage();
  }

  getLabels(key: string) {
    return key in this.translationsContent
      ? this.translationsContent[key]
      : key;
  }

  @Watch('items')
  async registerItemsLabels() {
    const keys: BoolDictionary = {};
    (this.items || []).forEach(item => {
      if (item.type === 'item') {
        if (item.label.startsWith('WGO_')) keys[item.label] = true;
      }
    });
    await this.registerTranslations(keys);
    this.innerLoading = false;
  }

  async created() {
    await this.registerItemsLabels();
    this.innerLoading = false;
  }
}
</script>
