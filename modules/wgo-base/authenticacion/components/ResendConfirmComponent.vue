<template>
  <div class="fullscreen bg-white text-black text-center flex flex-center row">
    <div class="col-12 col-md-6 col-lg-5 col-xl-4 col-sm-10">
      <q-card flat square bordered class="q-ma-lg">
        <q-form @submit="onResend">
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
          </q-card-section>
          <q-card-actions align="center" vertical class="row q-pa-sm">
            <q-btn
              unelevated
              v-if="!hideReister"
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
              v-if="!hideReister"
              dense
              color="primary"
              align="around"
              class="btn_width_fix q-mb-md col-12 col-sm-4"
              :label="translationsContent.WGO_LOGIN_RESEND_LABEL || 'Send'"
              type="submit"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { AuthService } from "../services/AuthService";

export default defineComponent({
  data() {
    return {
      email: "",
      translationsContent: {},
      showLoading: false,
    };
  },
  methods: {
    async onResend() {
      this.showLoading = true;
      const service = new AuthService();
      const result = await service.resendConfirmation({ email: this.email });
      if (result) {
        this.$emit("onResend", this.email);
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
    onResend(email: string) {
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
