<template>
  <q-page class="row justify-evenly">
    <Incomes />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Incomes from '../components/Incomes/Incomes.vue';

@Component({
  components: { Incomes }
})
export default class IncomesPage extends Vue {}
</script>
