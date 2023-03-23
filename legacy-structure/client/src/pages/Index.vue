<template>
  <q-page class="row justify-evenly">
    <div v-if="!innerLoading" class="col-12 col-md-10">
      <div class="q-pa-md">
        <h4 class="text-center">{{ getLabels('WGO_ADMIN_MODULES_LABEL') }}</h4>
        <div class="row" style="justify-content: space-around">
          <div
            v-for="(item, index) in modules"
            :key="index"
            class="col-12 col-sm-4"
          >
            <ModuleCard
              :icon="item.icon"
              :path="item.path"
              :text="getLabels(item.text)"
              :title="getLabels(item.title)"
            />
          </div>
        </div>
      </div>
    </div>
    <Loader :loading="innerLoading" />
  </q-page>
</template>

<script lang="ts">
import { WGO_MODULE_NAME } from 'src/modules/wgo';
import { BoolDictionary } from 'src/modules/wgo/models';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import ModuleCard from '../modules/wgo/components/ModuleCard/ModuleCard.vue';
import { getModules } from '../settings/RouterSettings';

@Component({
  components: {
    ModuleCard
  }
})
export default class HomePage extends Vue {
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, {
    namespace: languageNamespace
  })
  translationsContent!: { [key: string]: string };
  modules: {
    icon: string;
    text: string;
    title: string;
    path: string;
  }[] = [];
  innerLoading = true;
  constructor() {
    super();
    const module = process.env.MODULES || WGO_MODULE_NAME;
    this.modules = [];
    const mod = getModules(module);
    if (mod) this.modules = mod;
  }

  getLabels(key: string) {
    return key in this.translationsContent
      ? this.translationsContent[key]
      : key;
  }

  @Watch('modules')
  async registerItemsLabels() {
    const keys: BoolDictionary = { WGO_ADMIN_MODULES_LABEL: true };
    this.modules.forEach(item => {
      if (item.text.startsWith('WGO_')) keys[item.text] = true;
      if (item.title.startsWith('WGO_')) keys[item.title] = true;
    });
    await this.registerTranslations(keys);
  }

  async created() {
    await this.registerItemsLabels();
    this.innerLoading = false;
  }
}
</script>

<style scoped>
p,
h5 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

h4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 32;
}
</style>
