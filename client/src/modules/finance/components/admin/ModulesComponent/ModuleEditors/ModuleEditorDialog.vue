<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    :title="translationContent.FINANCE_MODULES_ADMIN_CREATE_SERVICE_LABEL"
    :close="() => onClose(false)"
  >
    <template slot="content">
      <ModuleEditor
        :close="onSuccess"
        :showLoading="value => (showLoading = value)"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import {
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { ITranslationModulesAdminKeys } from '../TranslationsKeys';
import ModuleEditor from './ModuleEditor.vue';
import Dialog from '../../../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    ModuleEditor,
    Dialog
  }
})
export default class ModuleEditorDialog extends Vue {
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationModulesAdminKeys;
  @Prop({ default: false }) showModal!: boolean;
  @Prop() onSuccess!: (success: boolean) => unknown;
  showLoading = false;

  onClose(success: boolean) {
    if (this.onSuccess) {
      this.onSuccess(success);
    }
  }
}
</script>
