<template>
  <div>
    <EmailSendedComponent v-if="!!email" :email="email" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import EmailSendedComponent from "../../../../../wgo-base/authenticacion/components/EmailSendedComponent.vue";

export default defineComponent({
  name: "RegisterEmailSendedPage",
  components: {
    EmailSendedComponent,
  },
  data() {
    const route = useRoute();
    return {
      email: (route.query.email as string) || "",
    };
  },
});
</script>
