<template>
  <q-page class="row justify-evenly">
    <div class="col-12 col-md-10">
      <ContactComponent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContactComponent from "../../components/ContactComponent/ContactComponent.vue";

export default defineComponent({
  name: "ContattoPage",
  components: {
    ContactComponent,
  },
});
</script>
