<template>
  <Dialog
    :open="open"
    icon="person"
    :title="getLabel(translations.TITLE_DIALOG)"
    :persistent="true"
    :showClose="true"
    maxWidth="900px"
    @close="close"
  >
    <q-card flat square class="q-pa-none">
      <q-form @submit="saveLanguage" class="q-pa-none">
        <q-card-section class="row q-pa-none">
          <div class="col-12">
            <q-input
              square
              outlined
              class="q-my-sm q-mx-sm"
              v-model="employeeInput.name"
              required
              :label="getLabel(translations.NAME)"
            />
          </div>
          <div class="col-12">
            <q-input
              square
              outlined
              class="q-my-sm q-mx-sm"
              v-model="employeeInput.lastName"
              required
              :label="getLabel(translations.LAST_NAME)"
            />
          </div>
          <div class="col-12">
            <q-input
              square
              outlined
              class="q-my-sm q-mx-sm"
              v-model="employeeInput.email"
              required
              :label="getLabel(translations.EMAIL)"
            />
          </div>
          <div class="col-12">
            <q-input
              square
              outlined
              class="q-my-sm q-mx-sm"
              v-model="employeeInput.code"
              required
              :label="getLabel(translations.CODE)"
            />
          </div>
        </q-card-section>
        <q-card-actions align="center" vertical class="row q-pa-sm q-py-md">
          <q-btn
            unelevated
            dense
            color="primary"
            align="around"
            class="btn_width_fix col-12 col-sm-4"
            :label="getLabel(tranBase.SAVE)"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TranslationStore } from '../../../wgo-base/translation/models/TranslationStore';
import { IEmployeeToImportModel } from '../../../../../src/models/EmployeesModel';
import Dialog from '../../../wgo-base/core/components/Dialog/Dialog.vue';
import { BaseTranslateComponent } from '../../../wgo-base/core/components/BaseComponents';
import { translations } from '../translations';
import { translations as tranBase } from '../../../wgo-base/core/models';

export default defineComponent({
  name: 'ImportEmployeeEditorDialog',
  props: {
    open: { type: Boolean, default: false },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    employee: { type: Object as PropType<IEmployeeToImportModel>, required: true },
  },
  components: {
    Dialog,
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    return {
      employeeInput: {} as IEmployeeToImportModel,
      getLabel: (name: string) => getLabel(this.tranStore, name),
      translations,
      tranBase,
    };
  },
  methods: {
    async saveLanguage() {
      this.$emit('success', this.employeeInput);
    },
    close() {
      this.$emit('close');
    },
  },
  emits: ['close', 'success'],
  watch: {
    employee() {
      this.employeeInput = { ...this.employee };
    },
  },
});
</script>

<style scoped>
.btn_width_fix {
  min-width: 100px;
}
</style>
