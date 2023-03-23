<template>
  <q-page class="row justify-evenly">
    <div class="col-12">
      <DoctorsContent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DoctorsContent from '../../components/admin/DoctorsContent/DoctorsContent.vue';

export default defineComponent({
  name: 'AdminDoctorsPage',
  components: {
    DoctorsContent,
  },
});
</script>
