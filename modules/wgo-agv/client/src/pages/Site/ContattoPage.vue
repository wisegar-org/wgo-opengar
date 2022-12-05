<template>
  <q-page class="row justify-evenly">
    <div class="col-12 col-md-10">
      <ContactComponent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { useMeta } from "quasar";
import { defineComponent } from "vue";
import { BaseSeoDataComponent } from "../../../../src/wgo-base/core/components/BaseComponents";
import ContactComponent from "../../components/ContactComponent/ContactComponent.vue";

export default defineComponent({
  name: "ContattoPage",
  components: {
    ContactComponent,
  },
  data() {
    const seoComponent = new BaseSeoDataComponent();
    useMeta(seoComponent.seoData);

    return {
      seoComponent,
    };
  },
  mounted() {
    this.seoComponent.setSeoData({
      title: "Contatto",
      webSite: "Assemblea Genitori di Vezia",
      description: {
        name: "description",
        content:
          "Assemblea Genitori Vezia - Lavoriamo per i nostri bimbi. Pagina dei contatti.",
      },
    } as any);
  },
});
</script>
