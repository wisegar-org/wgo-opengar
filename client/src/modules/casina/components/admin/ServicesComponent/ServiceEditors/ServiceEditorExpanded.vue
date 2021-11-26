<template>
  <ExpandedToggleHeader :label="title" :group="groupName" :icon="icon">
    <template slot="content">
      <div class="q-pa-sm">
        <ServiceEditor
          :service="service"
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
        :text="translationContent.CASINA_SERVICES_ADMIN_DELETE_TEXT"
        :onConfirm="deleteService"
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
  <!-- <q-expansion-item popup :group="groupName" :icon="icon" :label="title">
    <q-separator />
    <q-card>
      <q-card-section class="q-pa-none">
        <ServiceEditor
          :service="service"
          :showLoading="showLoading"
          :showDelete="true"
          :close="onSuccess"
          :showClose="false"
        />
      </q-card-section>
    </q-card>
  </q-expansion-item> -->
</template>

<script lang="ts">
import { StorageServiceItem } from '../../../../models/StorageModels';
import { Vue, Component, Prop } from 'vue-property-decorator';
import ServiceEditor from './ServiceEditor.vue';
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
import { ITranslationServicesAdminKeys } from '../TranslationsKeys';
import { INotify } from 'src/modules/wgo/models';

@Component({
  components: {
    ServiceEditor,
    ExpandedToggleHeader,
    ConfirmDialog
  }
})
export default class SeoExpandedEditor extends Vue {
  @Prop() groupName!: string;
  @Prop() icon!: string;
  @Prop() title!: string;
  @Prop() service!: StorageServiceItem;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Prop() onSuccess!: (result: boolean) => unknown;

  @Action(casinaModelsActionsKeys.deleteStorageItem, {
    namespace: casinaModelsNamespace
  })
  deleteServiceItem!: (id: number) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: ITranslationServicesAdminKeys;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  showDeleteConfirm = false;

  async deleteService() {
    this.showLoading(true);
    if (await this.deleteServiceItem(this.service.id)) {
      if (this.onSuccess) this.onSuccess(true);
      this.notify({
        message: this.translationContent.CASINA_SERVICES_ADMIN_SUCCESS_DELETE,
        type: 'positive'
      });
    } else {
      this.notify({
        message: this.translationContent.CASINA_SERVICES_ADMIN_FAIL_DELETE,
        type: 'negative'
      });
    }
    this.showLoading(false);
  }
}
</script>
