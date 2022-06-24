<template>
  <Dialog
    :open="open"
    icon="person"
    title="Edit profile"
    :persistent="true"
    :showClose="true"
    maxWidth="700px"
    @close="close"
  >
    <EditUserComponentVue :user="user" @onEdit="onSave" @onClose="close" />
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "@vue/composition-api";
import Dialog from "../../../core/components/Dialog/Dialog.vue";
import { IUser } from "../../../core/models";
import EditUserComponentVue from "./EditUserComponent.vue";

export default defineComponent({
  name: "EditUserDialog",
  components: {
    Dialog,
    EditUserComponentVue,
  },
  props: {
    open: { type: Boolean, default: false },
    user: {
      type: Object as PropType<IUser>,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    onSave(user: IUser) {
      this.$emit("onEdited", user);
    },
  },
  emits: {
    close() {
      return true;
    },
    onEdited(user: IUser) {
      return user;
    },
  },
});
</script>
