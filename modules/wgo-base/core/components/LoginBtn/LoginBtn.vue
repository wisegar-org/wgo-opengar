<template>
  <div>
    <div v-if="isLogged" class="row">
      <q-btn-dropdown flat :label="user.email" no-caps>
        <q-list style="min-width: 150px">
          <q-item clickable v-close-popup @click="() => showUserProfile(true)">
            <q-item-section>Edit profile</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="onLogout">
            <q-item-section>Logout</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <EditUserDialog
        :open="open"
        @close="() => showUserProfile(false)"
        :user="user"
        @onEdited="onEdited"
      />
    </div>
    <q-btn outline v-else icon="login" @click="onLogin" label="Login" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { IUser } from "../../models/user";
import EditUserDialog from "../../../authenticacion/components/EditUser/EditUserDialog.vue";

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<IUser>,
      required: false,
    },
  },
  components: {
    EditUserDialog,
  },
  data() {
    return {
      open: false,
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
