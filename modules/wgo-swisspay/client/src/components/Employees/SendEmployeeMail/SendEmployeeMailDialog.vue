<template>
  <Dialog
    :open="open"
    icon="person"
    :title="getLabel(translations.SEND_EMAIL_INVITATION_LINK)"
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
              v-model="code"
              required
              :lazyRules="true"
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
import { translations as tranBase } from '../../../wgo-base/core/models';
import { defineComponent, PropType } from 'vue';
import { TranslationStore } from '../../../wgo-base/translation/models/TranslationStore';
import Dialog from '../../../wgo-base/core/components/Dialog/Dialog.vue';
import { BaseTranslateComponent } from '../../../wgo-base/core/components/BaseComponents';
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
      code: '',
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
      const self = this;
      const enterprise_id = this.authStore.user.id;
      this.appStatusStore.setLoading(true);
      const result = await this.employeesService.sendEmployeeAddLink(this.code, enterprise_id);
      this.appStatusStore.setLoading(false);
      if (result) {
        this.notifyStore.setNotify({
          position: 'top',
          type: 'positive',
          message: this.getLabel(translations.EMAIL_SENDED_MESSAGE),
        });
        this.close();
      } else {
        this.$q
          .dialog({
            title: this.getLabel(translations.SEND_EMAIL_INVITATION_LINK),
            message: this.getLabel(translations.CONFIRM_CREATE_USER_MESSAGE),
            persistent: true,
            focus: 'cancel',
            ok: {
              color: 'primary',
              label: this.getLabel(tranBase.CONFIRM),
              tabindex: 0,
            },
            cancel: {
              flat: true,
              label: this.getLabel(tranBase.CANCEL),
              tabindex: 1,
            },
          })
          .onOk(() => {
            self.$emit('createUser', self.code);
          });
      }
    },
    close() {
      this.$emit('close');
    },
  },
  emits: ['close', 'createUser'],
});
</script>

<style scoped>
.btn_width_fix {
  min-width: 100px;
}
</style>
