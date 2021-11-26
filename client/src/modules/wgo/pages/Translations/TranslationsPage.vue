<template>
  <q-page class="row justify-evenly">
    <Translations />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Translations from '../../components/Translations/Translations.vue';

@Component({
  components: {
    Translations
  }
})
export default class TranslationsPage extends Vue {}
</script>
