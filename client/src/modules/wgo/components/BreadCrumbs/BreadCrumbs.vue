<template>
  <div class="fit">
    <div v-if="items && $q.screen.width >= 600" class=" q-pa-md fit">
      <q-breadcrumbs class="desktop-only">
        <q-breadcrumbs-el
          v-for="(v, k) in history || ['/']"
          :key="k"
          :label="getLabels(v.label)"
          :icon="v.icon"
          :to="v.to"
        />
      </q-breadcrumbs>
    </div>
    <div v-if="$q.screen.width < 600" class="q-my-xs row items-center">
      <q-btn
        unelevated
        flat
        round
        color="primary"
        icon="arrow_back"
        @click="routeService.goBack()"
      />
      <div
        class="text-primary text-weight-medium col"
        style="font-size:120%; text-overflow: ellipsis; overflow: hidden; display: block;"
      >
        {{ getLabels(history.slice(-1)[0].label) }}
      </div>

      <q-separator />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import { Route, NavigationGuardNext } from 'vue-router';
import { RouteService } from '../../services';
import { INavigationTo } from '../../models';
import { Getter, Mutation } from 'vuex-class';
import {
  componentsGettedKeys,
  componentsNamespace,
  componentsSettedKeys
} from '../../store/ComponentsState';
import { IBreadCrumbItem } from '../../models/IBreadCrumbItem';
import { languageGetters, languageNamespace } from '../../store/Language';

@Component({})
export default class BreadCrumbs extends Vue {
  @Prop() readonly items!: IBreadCrumbItem[];
  @Prop() readonly title!: string;
  @Getter(componentsGettedKeys.getRouterHistory, {
    namespace: componentsNamespace
  })
  history!: INavigationTo[];
  @Getter(languageGetters.getTranslations, {
    namespace: languageNamespace
  })
  translationsContent!: { [key: string]: string };
  @Mutation(componentsSettedKeys.pushRouterHistory, {
    namespace: componentsNamespace
  })
  pushHistoryRouter!: (value: INavigationTo) => void;
  @Mutation(componentsSettedKeys.setRouterHistory, {
    namespace: componentsNamespace
  })
  setHistoryRouter!: (value: INavigationTo[]) => void;
  paths: INavigationTo[] = [];
  routeService: RouteService;

  constructor() {
    super();
    this.routeService = new RouteService(this.$router);
    this.parsePath(this.$route);
    this.$router.beforeEach(
      (to: Route, from: Route, next: NavigationGuardNext<Vue>) =>
        this.beforeEach(to, from, next)
    );
  }

  getConfig(path: string, route?: Route, onlyMatch = false) {
    const params = route ? route.params : {};
    const index = this.items.findIndex(item => {
      const pathItem = this.getPathWithParams(item.to, params);
      return !item.hideBC && pathItem === path;
    });
    let config = { ...this.items[index], to: path };
    if (index !== -1) return config;
    config = {
      label: path
        .split('/')
        .join(' ')
        .toString(),
      to: path,
      icon: 'warning'
    };
    return onlyMatch ? null : config;
  }

  getPathWithParams(path: string, params: { [key: string]: string }) {
    let pathString = path;
    Object.keys(params).forEach(key => {
      pathString = pathString.split(`:${key}`).join(params[key]);
    });
    return pathString;
  }

  parsePath(route: Route) {
    const pathString = route.path;
    const rootPath = this.getConfig('/');
    const paths = rootPath && rootPath.label !== ' ' ? [rootPath] : [];
    if (pathString !== '/') {
      const pathsArray = pathString.split('/');
      let concatPath = '';
      pathsArray.forEach(str => {
        if (str !== '') {
          concatPath += `/${str}`;
        }
        const result = this.getConfig(concatPath, route, true);
        if (result) {
          paths.push(result);
        }
      });
    }
    this.setHistoryRouter(paths);
  }

  beforeEach(to: Route, from: Route, next: NavigationGuardNext<Vue>) {
    this.parsePath(to);
    next();
  }

  @Watch('items')
  reloadView() {
    this.parsePath(this.$route);
  }

  getLabels(key: string) {
    return key in this.translationsContent
      ? this.translationsContent[key]
      : key;
  }
}
</script>
