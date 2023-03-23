<template>
  <q-page class="row justify-evenly">
    <div class="col-12">
      <IndexContent />
      <div class="row">
        <div class="col-12">
          <ScheduleComponent />
        </div>
        <div class="col-12">
          <MapComponent />
        </div>
        <div class="col-12">
          <ContactComponent />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ContactComponent from '../components/ContactComponent.vue';
import MapComponent from '../components/MapComponent.vue';
import ScheduleComponent from '../components/ScheduleComponent.vue';
import IndexContent from '../components/IndexContent/IndexContent.vue';

@Component({
  components: {
    ContactComponent,
    MapComponent,
    ScheduleComponent,
    IndexContent
  }
})
export default class HomePage extends Vue {}
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
