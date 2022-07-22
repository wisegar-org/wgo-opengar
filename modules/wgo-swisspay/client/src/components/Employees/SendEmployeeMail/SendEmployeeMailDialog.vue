<template>
  <Dialog
    :open="open"
    icon="person"
    :title="getLabel(translations.ADD_EMPLOYEE_MESSAGE_TITLE)"
    :persistent="true"
    :showClose="true"
    maxWidth="800px"
    @close="close"
  >
    <q-card flat square class="q-pa-none fit flex" style="width: 100%">
      <q-form @submit="sendEmployEmail" class="q-pa-none fit">
        <q-card-section class="row q-pa-none justify-around">
          <div class="col-12">
            <q-input
              square
              outlined
              class="q-my-sm q-mx-sm"
              v-model="email"
              :rules="[(val) => isValidEmail(val) || getLabel(translations.INVALID_EMAIL)]"
              required
              :lazyRules="true"
              :label="getLabel(translations.EMAIL_ADDRESS_FIELD_NAME)"
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
            :label="getLabel(tranBase.SEND)"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </Dialog>
</template>

<script lang="ts">
import { translations } from '../translations';
import { translations as tranBase } from '../../../../../../wgo-base/core/models';
import { defineComponent, PropType } from 'vue';
import { TranslationStore } from '../../../../../../wgo-base/translation/models/TranslationStore';
import Dialog from '../../../../../../wgo-base/core/components/Dialog/Dialog.vue';
import { BaseTranslateComponent } from '../../../../../../wgo-base/core/components/BaseComponents';
import { EmployeesService } from '../../../services/Employees/EmployeesService';
import { useAuthStore } from '../../../stores/authStore';
import { useAppStatusStore } from '../../../stores/appStatusStore';
import { useNotifyStore } from '../../../stores/notifyStore';

export default defineComponent({
  name: 'SendEmployeeMailDialog',
  props: {
    open: { type: Boolean, default: false },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
  },
  components: {
    Dialog,
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    const employeesService = new EmployeesService();
    const appStatusStore = useAppStatusStore();
    const notifyStore = useNotifyStore();
    return {
      email: '',
      getLabel: (name: string) => getLabel(this.tranStore, name),
      translations,
      tranBase,
      employeesService,
      appStatusStore,
      notifyStore,
    };
  },
  setup() {
    const authStore = useAuthStore();
    return {
      authStore: authStore.authStore,
    };
  },
  methods: {
    async sendEmployEmail() {
      const enterprise_id = this.authStore.user.id;
      this.appStatusStore.setLoading(true);
      const result = await this.employeesService.sendEmployeeAddLink(this.email, enterprise_id);
      this.appStatusStore.setLoading(false);
      if (result) {
        this.notifyStore.setNotify({
          position: 'top',
          type: 'positive',
          message: this.getLabel(translations.EMAIL_SENDED_MESSAGE),
        });
        this.close();
      } else {
        this.notifyStore.setNotify({
          position: 'top',
          type: 'negative',
          message: this.getLabel(translations.EMAIL_NOT_SENDED_MESSAGE),
        });
      }
    },
    isValidEmail(email: string): boolean {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    close() {
      this.$emit('close');
    },
  },
  emits: ['close'],
});
</script>

<style scoped>
.btn_width_fix {
  min-width: 100px;
}
</style>
