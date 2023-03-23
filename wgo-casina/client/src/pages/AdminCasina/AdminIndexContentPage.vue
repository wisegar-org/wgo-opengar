<template>
  <q-page class="row justify-evenly">
    <div class="col-12">
      <IndexContentAdmin />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IndexContentAdmin from '../../components/admin/IndexContent/IndexContentAdmin.vue';

export default defineComponent({
  name: 'AdminIndexContentPage',
  components: {
    IndexContentAdmin,
  },
});
</script>
