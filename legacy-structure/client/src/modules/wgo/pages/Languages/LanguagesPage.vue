<template>
  <q-page class="row justify-evenly">
    <Language />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Language from '../../components/Languages/Language.vue';

@Component({
  components: {
    Language
  }
})
export default class LanguagesPage extends Vue {}
</script>
