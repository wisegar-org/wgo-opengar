<template>
  <q-page class="row justify-evenly">
    <div class="col-12 q-pa-md">
      <InscriptionAdminComponent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import InscriptionAdminComponent from '../../components/Admin/InscriptionAdmin/InscriptionAdminComponent.vue';

@Component({
  components: {
    InscriptionAdminComponent
  }
})
export default class AdminInscriptionsPage extends Vue {}
</script>
