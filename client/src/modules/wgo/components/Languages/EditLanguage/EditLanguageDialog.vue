<template>
  <Dialog
    :title="getTitle()"
    :showModal="showModal"
    :close="onClose"
    :loading="showLoading"
  >
    <template slot="content">
      <EditLanguage
        :close="close"
        :language="language"
        :showLoading="value => (showLoading = value)"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { LanguageResponseGql } from 'src/graphql';
import {
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { ITranslationLanguageKeys } from '../TranslationsKeys';
import EditLanguage from './EditLanguage.vue';
import Dialog from '../../Dialog/Dialog.vue';

@Component({
  components: {
    EditLanguage,
    Dialog
  }
})
export default class EditAgvEventDialog extends Vue {
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationLanguageKeys;
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() language!: LanguageResponseGql;

  showLoading = false;
  getTitle() {
    return !this.language
      ? this.translationContent.WGO_LANGUAGE_CREATE_LANGUAGE_LABEL
      : this.translationContent.WGO_LANGUAGE_MODIFY_LANGUAGE_LABEL;
  }

  onClose() {
    if (this.close) {
      this.close();
    }
  }
}
</script>
