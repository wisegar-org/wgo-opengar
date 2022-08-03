<template>
  <q-page class="row justify-evenly">
    <div class="col-12">
      <IndexContent />
      <div class="row">
        <div class="col-12 q-py-xl">
          <ScheduleComponent />
        </div>
        <div class="col-12 q-py-xl">
          <MapComponent :tranStore="tranStore" />
        </div>
        <div class="col-12 q-py-xl">
          <ContactComponent :tranStore="tranStore" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContactComponent from '../wgo-base/contact/components/ContactComponent/ContactComponent.vue';
import MapComponent from '../wgo-base/contact/components/MapComponent/MapComponent.vue';
import ScheduleComponent from '../components/ScheduleComponent/ScheduleComponent.vue';
import IndexContent from '../components/IndexContent/IndexContent.vue';
import { useTranslationStore } from '../stores/translationStore';
import { TranslationStore } from '../wgo-base/translation/models/TranslationStore';

export default defineComponent({
  name: 'IndexPage',
  components: {
    ContactComponent,
    MapComponent,
    ScheduleComponent,
    IndexContent,
  },
  setup() {
    const tranStore = useTranslationStore();
    return {
      tranStore: tranStore.translationStore as TranslationStore,
    };
  },
});
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
