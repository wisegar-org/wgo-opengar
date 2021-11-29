<template>
  <Dialog
    :showModal="showModal"
    :loading="showLoading"
    :title="translationContent.CASINA_DOCTORS_ADMIN_CREATE_SERVICE_LABEL"
    :close="() => onClose(false)"
  >
    <template slot="content">
      <DoctorEditor
        :close="onSuccess"
        :showLoading="value => (showLoading = value)"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { ITranslationDoctorsAdminKeys } from '../TranslationsKeys';
import DoctorEditor from './DoctorEditor.vue';
import Dialog from '../../../../../wgo/components/Dialog/Dialog.vue';
import {
  languageGetters,
  languageNamespace
} from '../../../../../wgo/store/Language';

@Component({
  components: {
    DoctorEditor,
    Dialog
  }
})
export default class DoctorEditorDialog extends Vue {
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationDoctorsAdminKeys;
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
