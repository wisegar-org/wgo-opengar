<template>
  <q-page class="row justify-evenly">
    <Bills />
  </q-page>
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
