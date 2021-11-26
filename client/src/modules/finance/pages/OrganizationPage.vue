<template>
  <q-page class="row justify-evenly">
    <Organization />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Organization from '../components/Organization/Organization.vue'

@Component({
  components: { Organization }
})
export default class OrganizationPage extends Vue {
}
</script>
