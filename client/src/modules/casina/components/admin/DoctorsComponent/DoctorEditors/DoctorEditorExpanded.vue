<template>
  <ExpandedToggleHeader :label="title" :group="groupName" :icon="icon">
    <template slot="content">
      <div class="q-pa-sm">
        <DoctorEditor
          :doctor="doctor"
          :showLoading="showLoading"
          :showDelete="false"
          :close="onSuccess"
          :showClose="false"
        />
      </div>
      <ConfirmDialog
        icon="delete"
        :showModal="showDeleteConfirm"
        :cancelButton="translationContent.WGO_CLOSE_BTN"
        :okButton="translationContent.WGO_DELETE_BTN"
        :text="translationContent.CASINA_DOCTORS_ADMIN_DELETE_TEXT"
        :onConfirm="deleteDoctor"
        :onClose="() => (showDeleteConfirm = false)"
      />
    </template>
    <template slot="buttons">
      <q-btn
        flat
        dense
        icon="delete"
        color="negative"
        @click="() => (showDeleteConfirm = true)"
      />
    </template>
  </ExpandedToggleHeader>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import DoctorEditor from './DoctorEditor.vue';
import { StorageDoctorItem } from '../../../../models/StorageModels';
import ExpandedToggleHeader from '../../../../../wgo/components/Expanded/ExpandedToggleHeader.vue';
import ConfirmDialog from '../../../../../wgo/components/ConfirmDialog/ConfirmDialog.vue';
import {
  casinaModelsActionsKeys,
  casinaModelsNamespace
} from 'src/modules/casina/store/CasinaModels';
import { Action, Getter } from 'vuex-class';
import {
  componentsNamespace,
  componentsActionsKeys
} from 'src/modules/wgo/store/ComponentsState';
import {
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { ITranslationDoctorsAdminKeys } from '../TranslationsKeys';
import { INotify } from 'src/modules/wgo/models';

@Component({
  components: {
    DoctorEditor,
    ExpandedToggleHeader,
    ConfirmDialog
  }
})
export default class SeoExpandedEditor extends Vue {
  @Prop() groupName!: string;
  @Prop() icon!: string;
  @Prop() title!: string;
  @Prop() doctor!: StorageDoctorItem;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Prop() onSuccess!: (result: boolean) => unknown;

  @Action(casinaModelsActionsKeys.deleteStorageItem, {
    namespace: casinaModelsNamespace
  })
  deleteDoctorItem!: (id: number) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationDoctorsAdminKeys;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  showDeleteConfirm = false;

  async deleteDoctor() {
    this.showLoading(true);
    if (await this.deleteDoctorItem(this.doctor.id)) {
      if (this.onSuccess) this.onSuccess(true);
      this.notify({
        message: this.translationContent.CASINA_DOCTORS_ADMIN_SUCCESS_DELETE,
        type: 'positive'
      });
    } else {
      this.notify({
        message: this.translationContent.CASINA_DOCTORS_ADMIN_FAIL_DELETE,
        type: 'negative'
      });
    }
    this.showLoading(false);
  }
}
</script>
