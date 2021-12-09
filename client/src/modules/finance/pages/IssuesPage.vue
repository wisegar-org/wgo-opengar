<template>
  <Issues />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Issues from '../components/Issues/Issues.vue';

@Component({
  components: { Issues }
})
export default class IssuesPage extends Vue {}
</script>
