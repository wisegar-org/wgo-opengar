<template>
  <div>
    <q-separator />
    <div class="text-h2">
      Sono un bottone da wgo-base-lib e vengo dal futuro!!!
    </div>
    <QButton icon="add">
      Add
      <q-tooltip>Qui puoi aggiungere qualcosa al futuro</q-tooltip>
    </QButton>
  </div>
</template>

<style></style>

<script lang="ts">
import QButton from "quasar";
export default {
  components: {
    QButton,
  },
  name: "HelloWorld",
};
</script>
