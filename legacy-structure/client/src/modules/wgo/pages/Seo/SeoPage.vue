<template>
  <q-page class="row justify-evenly">
    <div class="col-12 q-pa-md">
      <SeoComponent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SeoComponent from '../../components/Seo/SeoComponent.vue';

@Component({
  components: {
    SeoComponent
  }
})
export default class SeoPage extends Vue {}
</script>
