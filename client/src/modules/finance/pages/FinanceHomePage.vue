<template>
  <q-page class="row justify-evenly">
    <FinanceHome />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import FinanceHome from '../components/FinanceHome/FinanceHome.vue'

@Component({
  components: { FinanceHome },
})
export default class FinanceHomePage extends Vue {}
</script>
