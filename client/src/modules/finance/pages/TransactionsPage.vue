<template>
  <q-page class="row justify-evenly">
    <Transactions />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Transactions from '../components/Transactions/Transactions.vue'

@Component({
  components: { Transactions }
})
export default class TransactionsPage extends Vue {
}
</script>
