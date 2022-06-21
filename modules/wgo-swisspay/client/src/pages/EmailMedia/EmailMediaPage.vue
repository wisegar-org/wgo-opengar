<template>
  <EmailMediaList />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EmailMediaList from "../../components/EmailMedia/EmailMediaList.vue";

export default defineComponent({
  name: "EmailMediaPage",
  components: {
    EmailMediaList,
  },
});
</script>
