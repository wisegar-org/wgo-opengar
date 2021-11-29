<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    :title="getTitle()"
    :close="() => onClose()"
    styleDialog="width: 800px; max-width: 80vw"
  >
    <template slot="content">
      <SeoEditor
        :close="close"
        :metaData="metaData"
        :save="save"
        :showLoading="value => (showLoading = value)"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { ITranslationSeoKeys } from '../TranslationsKeys';
import SeoEditor from './SeoEditor.vue';
import Dialog from '../../../../wgo/components/Dialog/Dialog.vue';
import { languageGetters, languageNamespace } from '../../../store/Language';

@Component({
  components: {
    SeoEditor,
    Dialog
  }
})
export default class SeoEditorDialog extends Vue {
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationSeoKeys;
  @Prop({ default: false }) showModal!: boolean;
  @Prop() close!: () => void;
  @Prop() metaData!: {
    name: string;
    value: string;
  }[];
  @Prop() save!: (data: { name: string; value: string }[]) => void;
  showLoading = false;

  onClose() {
    if (this.close) {
      this.close();
    }
  }

  getTitle() {
    return !this.metaData
      ? this.translationContent.WGO_SEO_CREATE_META_LABEL
      : this.translationContent.WGO_SEO_MODIFY_META_LABEL;
  }
}
</script>
