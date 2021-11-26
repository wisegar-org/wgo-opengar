<template>
  <q-page class="row justify-evenly">
    <div class="col-12 q-pa-md">
      <DoctorsComponent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import DoctorsComponent from '../../components/admin/DoctorsComponent/DoctorsComponent.vue';

@Component({
  components: {
    DoctorsComponent
  }
})
export default class AdminDoctorsPage extends Vue {}
</script>
