<template>
  <q-input
    square
    outlined
    v-model="secret"
    :type="isSecret ? 'password' : 'text'"
    :label="label"
    @keydown.enter.prevent="onEnterClick"
    hide-bottom-space
    :error="!!isError"
    :error-message="error"
    :required="required"
  >
    <template v-slot:append>
      <q-icon
        :name="isSecret ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isSecret = !isSecret"
      />
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
export default defineComponent({
  name: "InputSecret",
  props: {
    label: {
      type: String,
      default: "",
    },
    isError: { type: Boolean, default: false },
    error: { type: String, default: "" },
    required: { type: Boolean, default: false },
  },
  model: {
    prop: "secret",
    event: "change",
  },
  data() {
    return {
      isSecret: true,
      secret: "",
    };
  },
  methods: {
    onEnterClick(evnt: KeyboardEvent) {
      this.$emit("onEnter", evnt);
    },
  },
  emits: {
    onEnter(evnt: KeyboardEvent) {
      return evnt;
    },
  },
});
</script>
