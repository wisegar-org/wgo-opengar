<template>
  <div class="fullscreen bg-white text-black text-center flex flex-center row">
    <div class="col-12 col-md-6 col-lg-5 col-xl-4 col-sm-10">
      <q-card flat square bordered class="q-ma-lg">
        <q-form @submit="onReset" ref="form">
          <q-item class="bg-primary text-white">
            <q-item-section avatar top>
              <q-icon
                name="img:favicon.ico"
                class="login_icon cursor-pointer"
                size="3.4em"
                @click="goToHome"
              />
            </q-item-section>
            <q-item-section top class="self-center">
              <div class="text-h6 text-left">Change password</div>
            </q-item-section>
            <q-item-section top side class="self-center">
              <q-btn
                class="gt-xs text-white"
                flat
                dense
                :label="translationsContent.WGO_LOGIN_GOHOME_LABEL || 'Home'"
                @click="goToHome"
              />
            </q-item-section>
          </q-item>
          <q-card-section class="q-ma-sm">
            <InputSecret
              class="q-my-md q-mx-sm"
              v-model="password"
              :required="true"
              :label="
                translationsContent.WGO_USERS_PASSWORD_LABEL || 'Password'
              "
              error="Passwords need to be equals"
              :hideBtnSpace="true"
            />
            <InputSecret
              class="q-my-lg q-mx-sm"
              v-model="confirmPassword"
              :required="true"
              :label="
                translationsContent.WGO_USERS_CONFIRM_PASSWORD_LABEL ||
                'Confirm Password'
              "
              @onEnter="onReset"
              :isError="password !== confirmPassword"
              :hideBtnSpace="true"
              error="Passwords need to be equals"
            />
          </q-card-section>
          <q-card-actions align="center" vertical class="row q-pa-sm">
            <q-btn
              unelevated
              dense
              color="primary"
              align="around"
              class="btn_width_fix q-mb-md col-12 col-sm-4"
              :label="
                translationsContent.WGO_LOGIN_CHANGE_PASSWORD_LABEL || 'Change'
              "
              type="submit"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
    <Loader :loading="showLoading" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { AuthService } from "../services/AuthService";
import InputSecret from "../../core/components/InputSecret/InputSecret.vue";
import Loader from "../../core/components/Loader/Loader.vue";

export default defineComponent({
  name: "ResetPasswordComponent",
  props: {
    token: {
      type: String,
      default: "",
    },
  },
  components: {
    Loader,
    InputSecret,
  },
  data() {
    return {
      password: "",
      confirmPassword: "",
      translationsContent: {},
      showLoading: false,
    };
  },
  methods: {
    async onReset() {
      if (this.password !== this.confirmPassword) return;
      this.showLoading = true;
      const service = new AuthService();
      const result = await service.changeResetPassword({
        token: this.token,
        password: this.password,
      });
      if (result) {
        this.$emit("onChangePassword");
      }
      this.showLoading = false;
    },
    goToHome() {
      this.$emit("onHome");
    },
  },
  emits: {
    onHome() {
      return;
    },
    onChangePassword() {
      return;
    },
  },
});
</script>

<style scoped>
.btn_width_fix {
  min-width: 100px;
}
</style>
