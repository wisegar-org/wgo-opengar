<template>
  <IssuesList />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IssuesList from "../../components/Finance/IssuesList/IssuesList.vue";

export default defineComponent({
  name: "IssuesPage",
  components: {
    IssuesList,
  },
  setup() {},
});
</script>
