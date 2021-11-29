<template>
  <Expanded :label="title" :group="groupName" :icon="icon">
    <template slot="content">
      <div class="q-pa-sm">
        <ModuleEditor
          :moduleItem="moduleItem"
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
        :text="translationContent.FINANCE_MODULES_ADMIN_DELETE_TEXT"
        :onConfirm="deleteModule"
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
  </Expanded>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ModuleEditor from './ModuleEditor.vue';
import Expanded from '../../../../../wgo/components/Expanded/Expanded.vue';
import ConfirmDialog from '../../../../../wgo/components/ConfirmDialog/ConfirmDialog.vue';
import { ITranslationModulesAdminKeys } from '../TranslationsKeys';
import { StorageModuleItem } from '../../../../models/models';
import {
  casinaModelsActionsKeys,
  casinaModelsNamespace
} from '../../../../../casina/store/CasinaModels';
import {
  languageGetters,
  languageNamespace
} from '../../../../../wgo/store/Language';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../../../../wgo/store/ComponentsState';
import { Action, Getter } from 'vuex-class';
import { INotify } from '../../../../../wgo/models';

@Component({
  components: {
    ModuleEditor,
    Expanded,
    ConfirmDialog
  }
})
export default class ModuleExpandedEditor extends Vue {
  @Prop() groupName!: string;
  @Prop() icon!: string;
  @Prop() title!: string;
  @Prop() moduleItem!: StorageModuleItem;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Prop() onSuccess!: (result: boolean) => unknown;

  @Action(casinaModelsActionsKeys.deleteStorageItem, {
    namespace: casinaModelsNamespace
  })
  deleteModuleItem!: (id: number) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationModulesAdminKeys;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  showDeleteConfirm = false;

  async deleteModule() {
    this.showLoading(true);
    if (await this.deleteModuleItem(this.moduleItem.id)) {
      if (this.onSuccess) this.onSuccess(true);
      this.notify({
        message: this.translationContent.FINANCE_MODULES_ADMIN_SUCCESS_DELETE,
        type: 'positive'
      });
    } else {
      this.notify({
        message: this.translationContent.FINANCE_MODULES_ADMIN_FAIL_DELETE,
        type: 'negative'
      });
    }
    this.showLoading(false);
  }
}
</script>
