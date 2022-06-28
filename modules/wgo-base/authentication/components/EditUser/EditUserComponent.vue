<template>
  <q-form @submit="editUser">
    <q-card-section class="row q-ma-xs q-pa-xs flex flex-center">
      <div class="col-12">
        <q-input
          square
          outlined
          readonly
          class="q-my-sm q-mx-sm"
          v-model="userInput.email"
          :autofocus="true"
          :label="translationsContent.WGO_USERS_COLUMN_EMAIL_LABEL || 'Email'"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          square
          outlined
          class="q-my-sm q-mx-sm"
          v-model="userInput.name"
          required
          :label="translationsContent.WGO_USERS_COLUMN_USERNAME_LABEL || 'Name'"
        />
      </div>

      <div class="col-12 col-md-6">
        <q-input
          square
          outlined
          required
          class="q-my-sm q-mx-sm"
          v-model="userInput.lastName"
          :label="translationsContent.WGO_USERS_LASTNAME_LABEL || 'Last Name'"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          square
          outlined
          required
          class="q-my-sm q-mx-sm"
          v-model="userInput.code"
          :label="translationsContent.WGO_USERS_LASTNAME_LABEL || 'Code'"
        />
      </div>
      <div class="col-12 col-md-6">
        <InputCopy
          class="q-my-sm q-mx-sm"
          :textCopy="user.certificate"
          :label="translationsContent.WGO_USERS_LASTNAME_LABEL || 'Certificate'"
        />
      </div>

      <div class="col-12 col-md-6">
        <InputSecret
          class="q-my-sm q-mx-sm"
          v-model="userInput.password"
          :required="false"
          :label="translationsContent.WGO_USERS_PASSWORD_LABEL || 'Password'"
        />
      </div>

      <div class="col-12 col-md-6">
        <InputSecret
          class="q-my-sm q-mx-sm"
          v-model="confirmPassword"
          :required="false"
          :label="
            translationsContent.WGO_USERS_CONFIRM_PASSWORD_LABEL ||
            'Confirm Password'
          "
          @onEnter="editUser"
          :isError="userInput.password !== confirmPassword"
          error="Passwords need to be equals"
        />
      </div>
    </q-card-section>
    <q-card-actions
      v-if="showBtns"
      align="center"
      vertical
      class="row q-ma-xs q-pa-xs"
    >
      <div class="row col-12 justify-around fit">
        <div class="col-12 col-sm-4 q-pt-xs">
          <q-btn
            unelevated
            dense
            color="primary"
            align="around"
            class="btn_width_fix"
            @click="close"
            :label="translationsContent.WGO_USER_CLOSE_LABEL || 'Close'"
          />
        </div>
        <div class="col-12 col-sm-4 q-pt-xs">
          <q-btn
            unelevated
            dense
            color="primary"
            align="around"
            class="btn_width_fix"
            :label="translationsContent.WGO_USER_EDIT_LABEL || 'Edit'"
            type="submit"
          />
        </div>
      </div>
    </q-card-actions>
    <Loader :loading="innerLoading || showLoading" />
  </q-form>
</template>

<script lang="ts">
import { AuthService } from "../../services/AuthService";
import Loader from "../../../core/components/Loader/Loader.vue";
import { IAuthRegisterParams, ISuccesLogin } from "../../models";
import { defineComponent, PropType } from "@vue/composition-api";
import InputSecret from "../../../core/components/InputSecret/InputSecret.vue";
import { IUser } from "../../../core/models/user";
import InputCopy from "../../../core/components/InputCopy/InputCopy.vue";

export default defineComponent({
  name: "EditUserComponent",
  components: {
    Loader,
    InputSecret,
    InputCopy,
  },
  props: {
    user: {
      type: Object as PropType<IUser>,
      required: true,
    },
    showBtns: { type: Boolean, default: true },
  },
  data() {
    return {
      userInput: {
        id: this.user.id,
        name: this.user.name,
        lastName: this.user.lastName,
        email: this.user.email,
        userName: this.user.userName,
        password: "",
        isEmailConfirmed: this.user.isEmailConfirmed,
        code: this.user.code,
      } as IAuthRegisterParams,
      confirmPassword: "",
      innerLoading: false,
      showLoading: false,
      translationsContent: {},
    };
  },
  methods: {
    async editUser() {
      if (this.userInput.password !== this.confirmPassword) return;
      this.showLoading = true;
      const service = new AuthService();
      this.userInput.isEmailConfirmed = false;
      const user = await service.editUser(this.userInput);
      if (user) {
        this.$emit("onEdit", user);
      }
      this.showLoading = false;
    },
    close() {
      this.$emit("onClose");
    },
  },
  computed: {
    validBtn(): boolean {
      return (
        !!this.userInput.email &&
        !!this.userInput.password &&
        this.userInput.password === this.confirmPassword
      );
    },
  },
  emits: {
    onClose() {
      return true;
    },
    onEdit(user: IUser) {
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
