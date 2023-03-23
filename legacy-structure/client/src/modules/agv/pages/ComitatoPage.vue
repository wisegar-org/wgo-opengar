<template>
  <q-page class="row justify-evenly">
    <div class="col-12 col-md-10 q-pa-md">
      <div class="block-text-card-down">
        <h4 class="q-my-none">Chi siamo:</h4>
        <p class="text-body1">
          L’Assemblea Genitori è costituita dai genitori di tutti gli allievi
          della Scuola Elementare e dell’Infanzia e il suo Comitato viene eletto
          durante la riunione annuale.
        </p>
        <p class="text-body1">
          Essa dà l’opportunità ai membri del Comitato di organizzare varie
          attività da svolgere con i bambini durante i doposcuola. È inoltre
          un’occasione di discussione e condivisione di eventuali proposte; si
          deve infatti all’iniziativa dell’Assemblea Generale dei Genitori la
          creazione della mensa scolastica.
        </p>
        <p class="text-body1">
          Il nostro Comitato non è a fine di lucro.
        </p>
        <br /><br />
        <p class="text-body1">
          Se siete incuriositi e interessati a entrare nel Comitato Genitori
          sarete i benvenuti! Contattateci tramite il formulario qui sotto:
        </p>
        <br />
      </div>
      <ComitatoContactForm mailTo="assembleagenitorivezia@gmail.com" />
      <div class="block-text-card-up block-text-card-down" />
      <div class="block-text-card-up block-text-card-down">
        <div class="row text-body1">
          <div class="col-12 text-h5">
            Membri di comitato:
          </div>
          <div class="col-12 col-md-6 ">Carlo Broggi</div>
          <div class="col-12 col-md-6">Barbara Foletti</div>
          <div class="col-12 col-md-6">Yariel Rodriguez</div>
          <div class="col-12 col-md-6">Patricia Galli</div>
          <div class="col-12 col-md-6">Sara Sofia</div>
          <div class="col-12 col-md-6">
            Alessia Manzan – <em>responsabile</em>
          </div>
          <div class="col-12 col-md-6">Kim Vismara</div>
          <div class="col-12 col-md-6">Nina Pershina</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ComitatoContactForm from '../components/Contact/ComitatoContactForm.vue';

@Component({
  components: {
    ComitatoContactForm
  }
})
export default class ComitatoPage extends Vue {}
</script>

<style scoped>
p,
h5 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

h4 {
  text-align: left;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 32;
}

.block-text-card-up {
  padding-top: 3rem;
}

.block-text-card-down {
  padding-bottom: 1rem;
}
</style>
