<template>
  <div class="q-pa-md">
      <div v-html="getContent(scheduleTitle)"></div>
      <div v-html="getContent(scheduleContent)"></div>
  </div>
</template>

<script lang="ts">
import {
  languageActions,
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { Vue, Component } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component({
  components: {}
})
export default class ScheduleComponent extends Vue {

  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: { [key: string]: string };
  
  scheduleTitle = 'WGO_CASINA_SCHEDULE_TITLE';
  scheduleContent = 'WGO_CASINA_SCHEDULE_CONTENT';
  
  loading = true;

  constructor() {
    super();
  }

  getContent(key: string) {
    return key in this.translationContent ? this.translationContent[key] : key;
  }

  async created() {
    await this.registerTranslations({
      [this.scheduleTitle]: false,
      [this.scheduleContent]: false
    });

    this.loading = false;
  }
}
</script>
