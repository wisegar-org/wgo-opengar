<template>
  <div id="q-app">
    <router-view />
    <Notify />
    <Loader :loading="innerLoading" />
  </div>
</template>

<script lang="ts">
import Loader from './modules/wgo/components/Loader.vue';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApiSettings } from './boot/settings';
import VueApollo from 'vue-apollo';
import Notify from './modules/wgo/components/Notify/Notify.vue';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { componentsNamespace, languageNamespace } from './modules/wgo/store';
import { languageActions, languageGetters } from './modules/wgo/store/Language';
import { LanguageResponseGql } from './graphql';
import {
  userActions,
  userGetters,
  userNamespace
} from './modules/wgo/store/User';
import { UserLogged } from './modules/wgo/models/models';
import { componentsGettedKeys } from './modules/wgo/store/ComponentsState';

const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: ApiSettings.API_BASE
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

//global register loader component
Vue.component('Loader', Loader);

@Component({
  name: 'App',
  apolloProvider,
  components: { Notify, Loader }
})
export default class App extends Vue {
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Action(userActions.loadUserLogged, {
    namespace: userNamespace
  })
  loadUserLogged!: () => Promise<void>;
  @Getter(languageGetters.getLanguages, { namespace: languageNamespace })
  languages!: LanguageResponseGql[];
  @Getter(languageGetters.getLanguage, { namespace: languageNamespace })
  language!: LanguageResponseGql;
  @Getter(userGetters.getLoggedUser, { namespace: userNamespace })
  userLogged!: UserLogged;
  @Action(languageActions.loadAndSetLanguage, { namespace: languageNamespace })
  loadAndSetLanguage!: (id: number) => Promise<unknown>;

  @Getter(componentsGettedKeys.getInnerLoagind, {
    namespace: componentsNamespace
  })
  innerLoading!: boolean;

  @Watch('languages')
  @Watch('userLogged.languageId')
  async setLanguage() {
    await this.loadAndSetLanguage(
      this.userLogged ? this.userLogged.languageId : 0
    );
  }

  async created() {
    await this.loadUserLogged();
    await this.registerTranslations({
      WGO_CLOSE_BTN: true,
      WGO_SAVE_BTN: true,
      WGO_EDIT_BTN: true,
      WGO_ADD_BTN: true,
      WGO_YES_BTN: true,
      WGO_NO_BTN: true,
      WGO_DELETE_BTN: true,
      WGO_SEND_BTN: true,
      WGO_RESEND_BTN: true,
      WGO_RECORD_PER_PAGE_LABEL: true,
      WGO_ADMIN_TITLE: true,
      WGO_LOGOUT_LABEL: true,
      WGO_LOGIN_LABEL: true,
      WGO_ERROR_NULL_FIELD: true
    });
  }
}
</script>
