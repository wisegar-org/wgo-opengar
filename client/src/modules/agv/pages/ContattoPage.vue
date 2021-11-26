<template>
  <q-page class="row justify-evenly">
    <div class="col-12 col-md-10 q-pa-md">
      <div class="block-text-card-down text-center">
        <h4>Informazioni di contatto</h4>
        <p class="text-h5">
          Indirizzo
        </p>
        <p class="text-body1">Assemblea Genitori di Vezia</p>
        <p class="text-body1">c/o Scuole Elementari Vezia</p>
        <p class="text-body1">Via S. Gottardo 30</p>
        <p class="text-body1">6943 Vezia</p>
        <p class="text-h5">
          Email
        </p>
        <a href="mailto:assembleagenitorivezia@gmail.com" class="text-body1"
          >assembleagenitorivezia@gmail.com</a
        >
      </div>
      <div class="block-text-card-up block-text-card-down">
        <h4>Mappa</h4>
        <iframe
          style="border: 0;"
          tabindex="0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2770.3167804467753!2d8.935831951278917!3d46.024827579009106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47843289aaa4979d%3A0x800b3208e6aadc4c!2sScuole%20Elementari!5e0!3m2!1sen!2sch!4v1610808587470!5m2!1sen!2sch"
          width="100%"
          height="450"
          frameborder="0"
          allowfullscreen="allowfullscreen"
          aria-hidden="false"
        ></iframe>
      </div>
      <div class="block-text-card-up block-text-card-down">
        <h4>Contattaci</h4>
        <ContactFrom mailTo="assembleagenitorivezia@gmail.com" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ContactFrom from '../components/Contact/ContactForm.vue';

@Component({
  components: {
    ContactFrom
  }
})
export default class ContattoPage extends Vue {
  getStyleRecord(index: number) {
    return `background-color: ${index % 2 === 0 ? 'lightgray' : 'white'};`;
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
  text-align: center;
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
