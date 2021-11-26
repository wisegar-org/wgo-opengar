<template>
  <q-page class="row justify-evenly">
    <Expenses />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Expenses from '../components/Expenses/Expenses.vue'

@Component({
  components: { Expenses }
})
export default class ExpensesPage extends Vue {
}
</script>
