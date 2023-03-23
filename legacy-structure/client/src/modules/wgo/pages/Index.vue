<template>
  <q-page class="row justify-evenly">
    <div class="col-12 col-md-10">
      <div class="q-pa-md">
        <h4 class="text-center">WGO ADMIN</h4>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ModuleCard from '../components/ModuleCard/ModuleCard.vue';

@Component({
  components: {
    ModuleCard
  }
})
export default class HomePage extends Vue {
  constructor() {
    super();
  }
}
</script>

<style scoped>
p,
h5 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

h4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 32;
}
</style>
