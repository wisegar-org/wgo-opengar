<template>
  <div
    class="fullscreen bg-white text-black text-center flex flex-center row"
    style="overflow-y: auto"
  >
    <div class="col-12 col-md-6 col-lg-5 col-xl-4 col-sm-10">
      <q-card flat square bordered>
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
            <div class="text-h6 text-left">
              {{ getLabel(translations.REGISTER_TITLE) }}
            </div>
          </q-item-section>
          <q-item-section top side class="self-center">
            <q-btn
              class="gt-xs text-white"
              flat
              dense
              :label="getLabel(tranBase.GO_BACK)"
              @click="goBackClick"
            />
          </q-item-section>
        </q-item>
        <q-form @submit="registerUser" class="q-pa-lg">
          <q-card-section class="row q-ma-sm flex flex-center">
            <div class="col-12 col-sm-8">
              <q-input
                square
                outlined
                class="q-my-sm q-mx-sm"
                v-model="user.name"
                required
                :label="getLabel(translations.COLUMN_NAME)"
              />
            </div>

            <div class="col-12 col-sm-8">
              <q-input
                square
                outlined
                required
                class="q-my-sm q-mx-sm"
                v-model="user.lastName"
                :label="getLabel(translations.COLUMN_LAST_NAME)"
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
                :label="getLabel(translations.COLUMN_EMAIL)"
              />
            </div>

            <div class="col-12 col-sm-8">
              <InputSecret
                class="q-my-sm q-mx-sm"
                v-model="user.password"
                :required="true"
                :label="getLabel(translations.COLUMN_PASSWORD)"
              />
            </div>

            <div class="col-12 col-sm-8">
              <InputSecret
                class="q-my-sm q-mx-sm"
                v-model="confirmPassword"
                :required="true"
                :label="getLabel(translations.COLUMN_CONFIRM_PASSWORD)"
                @onEnter="registerUser"
                :isError="user.password !== confirmPassword"
                :error="getLabel(translations.PASSWORD_EQUALS_ERR)"
              />
            </div>
          </q-card-section>
          <q-card-actions align="center" vertical class="row q-pa-sm q-pb-md">
            <q-btn
              unelevated
              dense
              color="primary"
              align="around"
              class="btn_width_fix col-12 col-sm-4"
              :label="getLabel(translations.REGISTER_LB)"
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
import { defineComponent, PropType } from "@vue/composition-api";
import InputSecret from "../../core/components/InputSecret/InputSecret.vue";
import { IUser } from "../../core/models/user";
import { TranslationStore } from "../../translation/models/TranslationStore";
import { translations } from "../models/translations";
import { BaseTranslateComponent } from "../../core/components/BaseComponents";
import { translations as tranBase } from "../../core/models";

export default defineComponent({
  name: "RegisterComponent",
  components: {
    Loader,
    InputSecret,
  },
  props: {
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    roles: { type: Array as PropType<string[]>, default: [] },
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    return {
      user: {
        userName: "",
        name: "",
        lastName: "",
        email: "",
        password: "",
        roles: this.roles,
      } as IAuthRegisterParams,
      confirmPassword: "",
      innerLoading: false,
      showLoading: false,
      tranBase,
      translations,
      getLabel: (name: string) => getLabel(this.tranStore, name),
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
      return true;
    },
    goBack() {
      return true;
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
