<template>
  <q-page class="row justify-evenly">
    <div class="col-12 col-md-10">
      <Loader :loading="loading" />
      <div v-if="!loading" class="q-pa-md">
        <div v-html="getContent(contentKey)" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../../wgo/store/Language';

@Component({
  components: {}
})
export default class ContactPage extends Vue {
  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: { [key: string]: string };
  contentKey = 'WGO_CASINA_CONTACT_PAGE_CONTENT';
  loading = true;

  constructor() {
    super();
  }

  getContent(key: string) {
    return key in this.translationContent ? this.translationContent[key] : key;
  }

  async created() {
    await this.registerTranslations({
      [this.contentKey]: false
    });
    this.loading = false;
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
