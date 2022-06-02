<template>
  <div>
    <div v-if="isLogged" class="row">
      <div class="user_email_style">{{ user.email }}</div>
      <q-btn flat icon="logout" @click="onLogout" />
    </div>
    <q-btn outline v-else icon="login" @click="onLogin" label="Login" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { IUser } from "../../models/user";

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<IUser>,
      required: false,
    },
  },
  methods: {
    onLogin() {
      this.$emit("onLoginClick");
    },
    onLogout() {
      this.$emit("onLogoutClick");
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
      return;
    },
    onLogoutClick: () => {
      return;
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
