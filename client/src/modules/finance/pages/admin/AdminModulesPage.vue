<template>
  <q-page class="row justify-evenly">
    <div class="col-12 q-pa-md">
      <ModulesComponent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ModulesComponent from 'src/modules/finance/components/admin/ModulesComponent/ModulesComponent.vue';

@Component({
  components: {
    ModulesComponent
  }
})
export default class AdminIndexContentPage extends Vue {}
</script>