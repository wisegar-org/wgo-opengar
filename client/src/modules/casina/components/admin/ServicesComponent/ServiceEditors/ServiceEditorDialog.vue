<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    :title="translationContent.CASINA_SERVICES_ADMIN_CREATE_SERVICE_LABEL"
    :close="() => onClose(false)"
  >
    <template slot="content">
      <ServiceEditor
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
import { ITranslationServicesAdminKeys } from '../TranslationsKeys';
import ServiceEditor from './ServiceEditor.vue';
import Dialog from '../../../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    ServiceEditor,
    Dialog
  }
})
export default class ServiceEditorDialog extends Vue {
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationServicesAdminKeys;
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
