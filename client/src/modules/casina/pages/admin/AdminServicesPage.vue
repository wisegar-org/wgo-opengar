<template>
  <q-page class="row justify-evenly">
    <div class="col-12 q-pa-md">
      <ServicesComponent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ServicesComponent from '../../components/admin/ServicesComponent/ServicesComponent.vue';

@Component({
  components: {
    ServicesComponent
  }
})
export default class AdminServicesPage extends Vue {}
</script>
