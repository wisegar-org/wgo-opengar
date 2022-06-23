<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin" style="width: 600px">
      <q-item class="bg-primary text-white">
        <q-item-section avatar top>
          <q-icon name="img:favicon.ico" class="login_icon cursor-pointer" size="3.4em" />
        </q-item-section>
        <q-item-section top class="self-center">
          <div class="text-h6 text-left">Login</div>
        </q-item-section>
        <q-item-section top side class="self-center">
          <q-btn
            class="gt-xs text-white"
            flat
            dense
            :label="translationsContent.WGO_LOGIN_GOHOME_LABEL || 'Login Page'"
            @click="goToLogin"
          />
        </q-item-section>
      </q-item>
      <q-form @submit="onLoginClick" class="q-pa-sm">
        <q-card-section class="q-ma-sm">
          <q-input
            square
            outlined
            :readonly="!!user.email"
            class="q-my-sm"
            v-model="userName"
            :autofocus="true"
            :label="translationsContent.WGO_USERS_COLUMN_USERNAME_LABEL || 'User'"
          />

          <InputSecret
            class="q-my-lg"
            v-model="password"
            :label="translationsContent.WGO_USERS_PASSWORD_LABEL || 'Password'"
            @onEnter="onLoginClick"
            :hideBtnSpace="true"
            :required="true"
          />
        </q-card-section>
        <q-card-actions align="around">
          <q-btn color="primary" label="Cancel" @click="goToLogin" class="btn_width_fix q-mb-md col-12 col-sm-4" />
          <q-btn color="primary" label="Login" type="submit" class="btn_width_fix q-mb-md col-12 col-sm-4" />
        </q-card-actions>
      </q-form>
    </q-card>

    <Loader :loading="showLoading" />
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { PropType, defineComponent, ref } from 'vue';
import { IUser } from '../../../../../wgo-base/core/models';
import Loader from '../../../../../wgo-base/core/components/Loader/Loader.vue';
import { AuthService } from '../../../../../wgo-base/authentication/services/AuthService';
import { useRouter } from 'vue-router';
import { RouteService } from '../../../../../wgo-base/core/services/RouteService';
import { AuthPaths } from '../../../../../wgo-base/authentication/router';
import InputSecret from '../../../../../wgo-base/core/components/InputSecret/InputSecret.vue';
import { useAuthStore } from '../../stores/authStore';

export default defineComponent({
  name: 'LoginDialog',
  components: { Loader, InputSecret },
  data() {
    return {
      password: '',
      showLoading: false,
      translationsContent: {},
    };
  },
  setup() {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
    const router = useRouter();
    const authStore = useAuthStore();
    const userName = ref('');
    userName.value = authStore.user.userName;

    return {
      user: authStore.user,
      userName,
      authStore,
      dialogRef,
      onDialogHide,
      onDialogOK,
      onDialogCancel,
      routeService: new RouteService(router),
    };
  },
  methods: {
    async onLoginClick() {
      this.showLoading = true;
      const service = new AuthService();
      const result = await service.loginUser({
        user: this.userName,
        password: this.password,
      });
      this.showLoading = false;
      if (result) {
        this.authStore.setToken(result.token);
        this.onDialogOK();
      }
    },
    goToLogin() {
      this.routeService.goTo(AuthPaths.authLogin.path);
      this.onDialogCancel();
    },
  },
  emits: [...useDialogPluginComponent.emits],
});
</script>

<style scoped>
.btn_width_fix {
  min-width: 100px;
}
</style>
