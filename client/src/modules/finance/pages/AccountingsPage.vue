<template>
  <q-page class="row justify-evenly">
    <Accountings />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Accountings from '../components/Accounting/Accountings.vue'

@Component({
  components: { Accountings }
})
export default class AccountingsPage extends Vue {
}
</script>
