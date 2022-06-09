<template>
  <div
    class="fullscreen bg-white text-black text-center flex flex-center row"
    style="overflow-y: auto"
  >
    <div class="col-12 col-md-6 col-lg-5 col-xl-4 col-sm-10">
      <q-card flat square bordered class="q-pa-lg">
        <q-form @submit="registerUser">
          <q-card-section class="row q-ma-sm flex flex-center">
            <q-icon
              name="img:favicon.ico"
              class="login_icon cursor-pointer q-mb-md col-12"
              size="4.4em"
              @click="goToHome"
            />
            <div class="text-h5 col-12">Register</div>
            <div class="col-12 col-sm-8">
              <q-input
                square
                outlined
                class="q-my-sm q-mx-sm"
                v-model="user.name"
                required
                :label="
                  translationsContent.WGO_USERS_COLUMN_USERNAME_LABEL || 'Name'
                "
              />
            </div>

            <div class="col-12 col-sm-8">
              <q-input
                square
                outlined
                required
                class="q-my-sm q-mx-sm"
                v-model="user.lastName"
                :label="
                  translationsContent.WGO_USERS_LASTNAME_LABEL || 'Last Name'
                "
              />
            </div>

            <div class="col-12 col-sm-8">
              <q-input
                square
                outlined
                required
                class="q-my-sm q-mx-sm"
                v-model="user.email"
                :autofocus="true"
                :label="
                  translationsContent.WGO_USERS_COLUMN_EMAIL_LABEL || 'Email'
                "
              />
            </div>

            <div class="col-12 col-sm-8">
              <InputSecret
                class="q-my-sm q-mx-sm"
                v-model="user.password"
                :required="true"
                :label="
                  translationsContent.WGO_USERS_PASSWORD_LABEL || 'Password'
                "
                @onEnter="loginUser"
              />
            </div>

            <div class="col-12 col-sm-8">
              <InputSecret
                class="q-my-sm q-mx-sm"
                v-model="confirmPassword"
                :required="true"
                :label="
                  translationsContent.WGO_USERS_CONFIRM_PASSWORD_LABEL ||
                  'Confirm Password'
                "
                @onEnter="loginUser"
                :isError="user.password !== confirmPassword"
                error="Passwords need to be equals"
              />
            </div>
          </q-card-section>
          <q-card-actions align="center" vertical class="row q-pa-sm q-pb-md">
            <q-btn
              unelevated
              flat
              dense
              color="primary"
              align="around"
              class="btn_width_fix q-mb-md col-12 col-sm-4"
              :label="
                translationsContent.WGO_LOGIN_REGISTER_GO_BACK_LABEL ||
                'Go Back'
              "
              @click="goBackClick"
            />
            <q-btn
              unelevated
              dense
              color="primary"
              align="around"
              class="btn_width_fix col-12 col-sm-4"
              :label="translationsContent.WGO_REGISTER_LABEL || 'Register'"
              type="submit"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
    <Loader :loading="innerLoading || showLoading" />
  </div>
</template>

<script lang="ts">
import { AuthService } from "../services/AuthService";
import Loader from "../../core/components/Loader/Loader.vue";
import { IAuthRegisterParams, ISuccesLogin } from "../models";
import { defineComponent } from "@vue/composition-api";
import InputSecret from "../../core/components/InputSecret/InputSecret.vue";
import { IUser } from "../../core/models/user";

export default defineComponent({
  name: "RegisterComponent",
  components: {
    Loader,
    InputSecret,
  },
  props: {},
  data() {
    return {
      user: {
        userName: "",
        name: "",
        lastName: "",
        email: "",
        password: "",
      } as IAuthRegisterParams,
      confirmPassword: "",
      innerLoading: false,
      showLoading: false,
      translationsContent: {},
    };
  },
  methods: {
    async registerUser() {
      if (this.user.password !== this.confirmPassword) return;
      this.showLoading = true;
      const service = new AuthService();
      this.user.userName = this.user.email;
      this.user.isEmailConfirmed = false;
      const user = await service.registerUser(this.user);
      if (user) {
        this.$emit("onRegister", user);
      }
      this.showLoading = false;
    },
    goBackClick() {
      this.$emit("goBack");
    },
    goToHome() {
      this.$emit("onHome");
    },
  },
  computed: {
    validBtn(): boolean {
      return (
        !!this.user.email &&
        !!this.user.password &&
        this.user.password === this.confirmPassword
      );
    },
  },
  emits: {
    onHome() {
      return;
    },
    goBack() {
      return;
    },
    onRegister(user: IUser) {
      return user;
    },
  },
});
</script>

<style scoped>
.div_register_style {
  overflow-y: auto;
}
.btn_width_fix {
  min-width: 100px;
}
.max_heigth_card {
  max-height: 90vh;
}
</style>
