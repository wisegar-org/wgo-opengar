<template>
  <Bills />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Bills from '../components/Bills/Bills.vue';

@Component({
  components: {
    Bills
  }
})
export default class BillsPage extends Vue {}
</script>
