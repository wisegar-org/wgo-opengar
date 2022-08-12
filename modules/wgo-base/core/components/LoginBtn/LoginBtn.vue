<template>
  <div style="align-self: center">
    <div v-if="isLogged" class="row">
      <q-btn-dropdown flat :label="user.email" no-caps>
        <q-list style="min-width: 150px">
          <q-item clickable v-close-popup @click="() => showUserProfile(true)">
            <q-item-section>{{
              getLabel(translations.EDIT_PROFILE)
            }}</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="onLogout">
            <q-item-section>{{ getLabel(translations.LOGOUT) }}</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <EditUserDialog
        :open="open"
        :tranStore="tranStore"
        :authStore="authStore"
        @close="() => showUserProfile(false)"
        :user="user"
        @onEdited="onEdited"
      />
    </div>
    <q-btn
      outline
      v-else
      icon="login"
      @click="onLogin"
      :label="getLabel(translations.LOGIN)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { IUser } from "../../models/user";
import EditUserDialog from "../../../authentication/components/EditUser/EditUserDialog.vue";
import { TranslationStore } from "../../../translation/models/TranslationStore";
import { BaseTranslateComponent } from "../BaseComponents";
import { translations } from "../../models";
import { AuthStore } from "../../../authentication/models/AuthStore";

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<IUser>,
      required: false,
    },
    tranStore: { type: Object as PropType<TranslationStore>, required: true },
    authStore: { type: Object as PropType<AuthStore>, required: true },
  },
  components: {
    EditUserDialog,
  },
  data() {
    const { getLabel } = new BaseTranslateComponent();
    return {
      open: false,
      getLabel: (name: string) => getLabel(this.tranStore, name),
      translations,
    };
  },
  methods: {
    showUserProfile(status: boolean) {
      this.open = status;
    },
    onLogin() {
      this.$emit("onLoginClick");
    },
    onLogout() {
      this.$emit("onLogoutClick");
    },
    onEdited(user: IUser) {
      this.showUserProfile(false);
      this.$emit("onSaveUser", user);
    },
  },
  computed: {
    isLogged(): boolean {
      return !!this.user && !!this.user.id;
    },
    userEmail(): string {
      return this.user?.email || "";
    },
  },
  emits: {
    onLoginClick: () => {
      return true;
    },
    onLogoutClick: () => {
      return true;
    },
    onSaveUser(user: IUser) {
      return user;
    },
  },
});
</script>

<style scoped>
.user_email_style {
  display: flex;
  align-items: center;
}
</style>
