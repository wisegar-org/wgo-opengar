<template>
  <q-page class="row justify-evenly">
    <div class="col-12 q-pa-md">
      <ContactAdminComponent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ContactAdminComponent from '../../components/admin/ContactAdminComponent.vue';

@Component({
  components: {
    ContactAdminComponent
  }
})
export default class AdminContactPage extends Vue {}
</script>
