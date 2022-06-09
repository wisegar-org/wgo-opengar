<template>
  <div class="fullscreen bg-white text-black text-center flex flex-center row">
    <div class="col-12 col-md-6 col-lg-5 col-xl-4 col-sm-10">
      <q-card flat square bordered class="q-ma-lg">
        <q-form @submit="onReset" ref="form">
          <q-card-section class="q-ma-sm">
            <q-icon
              name="img:favicon.ico"
              class="login_icon cursor-pointer q-mb-xl"
              size="4.4em"
              @click="goToHome"
            />
            <q-input
              square
              outlined
              class="q-mb-sm q-mx-sm"
              v-model="email"
              required
              :autofocus="true"
              :label="
                translationsContent.WGO_USERS_COLUMN_EMAIL_LABEL || 'Email'
              "
            />
            <InputSecret
              class="q-my-sm q-mx-sm"
              v-model="password"
              :required="true"
              :label="
                translationsContent.WGO_USERS_PASSWORD_LABEL || 'Password'
              "
              error="Passwords need to be equals"
            />
            <InputSecret
              class="q-my-sm q-mx-sm"
              v-model="confirmPassword"
              :required="true"
              :label="
                translationsContent.WGO_USERS_CONFIRM_PASSWORD_LABEL ||
                'Confirm Password'
              "
              @onEnter="onReset"
              :isError="password !== confirmPassword"
              error="Passwords need to be equals"
            />
          </q-card-section>
          <q-card-actions align="center" vertical class="row q-pa-sm">
            <q-btn
              unelevated
              flat
              dense
              color="primary"
              align="around"
              class="btn_width_fix q-mb-md col-12 col-sm-4"
              :label="translationsContent.WGO_LOGIN_GOHOME_LABEL || 'Home'"
              @click="goToHome"
            />
            <q-btn
              unelevated
              dense
              color="primary"
              align="around"
              class="btn_width_fix q-mb-md col-12 col-sm-4"
              :label="
                translationsContent.WGO_LOGIN_RESET_PASSWORD_LABEL || 'Reset'
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
  components: {
    Loader,
    InputSecret,
  },
  data() {
    return {
      email: "",
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
      const result = await service.resetPassword({
        user: this.email,
        password: this.password,
      });
      if (result) {
        this.$emit("onReset", this.email);
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
    onReset(email: string) {
      return email;
    },
  },
});
</script>

<style scoped>
.btn_width_fix {
  min-width: 100px;
}
</style>
