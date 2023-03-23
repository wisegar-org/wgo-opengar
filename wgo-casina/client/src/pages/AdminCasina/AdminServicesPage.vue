<template>
  <q-page class="row justify-evenly">
    <div class="col-12">
      <ServicesContent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ServicesContent from '../../components/admin/ServicesContent/ServicesContent.vue';

export default defineComponent({
  name: 'AdminServicesPage',
  components: {
    ServicesContent,
  },
});
</script>
