<template>
  <RegisterComponent
    @goBack="onGoBack"
    :tranStore="tranStore"
    :roles="roles"
    :isEmailConfirmed="isEmailConfirmed"
    @onRegister="onRegister"
    @onHome="onGoHome"
  />
</template>

<script lang="ts">
import { useNotifyStore } from '../../stores/notifyStore';
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AuthPaths } from '@wisegar-org/wgo-base-models/build/authentication';
import { BaseTranslateComponent } from '@wisegar-org/wgo-base-client/build/core/components/BaseComponents';
import { IUser } from '@wisegar-org/wgo-base-models/build/core';
import { RouteService } from '@wisegar-org/wgo-base-client/build/core/services/RouteService';
import { TranslationStore } from '@wisegar-org/wgo-base-client/build/translation/store/TranslationStore';
import { USER_ROLE } from '../../../../src/models/constants';
import { Paths } from '../../router/paths';
import { EmployeesService } from '../../services/Employees/EmployeesService';
import { useTranslationStore } from '../../stores/translationStore';
import { translations } from '../../components/Employees/translations';
import RegisterComponent from '@wisegar-org/wgo-base-client/build/authentication/components/RegisterComponent.vue';

export default defineComponent({
  components: {
    RegisterComponent,
  },
  data() {
    const route = useRoute();
    const router = useRouter();
    const roles = [USER_ROLE];
    return {
      roles,
      isEmailConfirmed: false,
      enterprise_id: 0,
      routeService: new RouteService(router),
      token: (route.query.token as string) || '',
    };
  },
  setup() {
    const translationStore = useTranslationStore();
    const notyfyStore = useNotifyStore();
    const employeesService = new EmployeesService();
    const { getLabel } = new BaseTranslateComponent();

    return {
      employeesService,
      notyfyStore,
      tranStore: translationStore.translationStore as TranslationStore,
      getLabel: (name: string) => getLabel(translationStore.translationStore as TranslationStore, name),
    };
  },
  methods: {
    onGoHome() {
      this.routeService.goTo(Paths.home.path);
    },
    onGoBack() {
      this.routeService.goBack();
    },
    async onRegister(user: IUser) {
      if (this.token && this.enterprise_id) {
        await this.employeesService.addEmployee(user.email, user.name, this.enterprise_id, user.id);
      }
      if (this.isEmailConfirmed) this.routeService.goTo(AuthPaths.authLogin.path);
      else
        this.routeService.goTo(AuthPaths.authEmailSended.path, {
          email: user.email,
        });
    },
  },
  async mounted() {
    if (this.token) {
      const resp = await this.employeesService.checkEmployeeToken(this.token);
      if (resp) {
        this.enterprise_id = resp;
      } else {
        this.onGoHome();
        this.notyfyStore.setNotify({
          position: 'top',
          type: 'negative',
          message: this.getLabel(translations.INVALID_TOKEN_EMPLOYEE),
        });
      }
    }
  },
});
</script>
