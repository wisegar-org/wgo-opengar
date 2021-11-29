<template>
  <q-page class="row justify-evenly">
    <div class="col-12">
      <IndexContent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import IndexContent from '../components/IndexContent/IndexContent.vue';

@Component({
  components: {
    IndexContent
  }
})
export default class IndexPage extends Vue {}
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
