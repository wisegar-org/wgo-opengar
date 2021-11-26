<template>
  <q-page class="row justify-evenly">
    <div class="col-12 q-pa-md">
      <IndexContent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IndexContent from '../../components/admin/IndexContent/IndexContent.vue';

@Component({
  components: {
    IndexContent
  }
})
export default class AdminIndexContentPage extends Vue {}
</script>
