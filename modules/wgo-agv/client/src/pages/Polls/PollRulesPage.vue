<template>
  <div class="row justify-center">
    <q-card
      v-if="!!pollData && !!pollData.header && !!pollData.header.title"
      class="my-card col-12 col-md-10"
      flat
    >
      <q-card-section q-pb-xl>
        <div class="row display-flex justify-center">
          <div class="col-0 col-sm-2 col-md-2 image-div-justify">
            <q-img
              src="icons/favicon.png"
              :img-style="{ 'background-size': 'contain' }"
            />
          </div>

          <q-card-section
            class="
              col-12 col-sm-10 col-md-8 col-lg-8
              column
              display-flex
              justify-center
              self-center
            "
          >
            <div
              class="row display-flex justify-center"
              style="width: 100%; max-width: 800px"
            >
              <div class="col-md-11 col-12 q-pa-sm">
                <div style="display: flex; justify-content: center">
                  <h5 class="q-pa-none q-ma-sm text-center text-primary">
                    {{ pollData.header.title }}
                  </h5>
                </div>
                <div style="display: flex; justify-content: center">
                  <h6 class="q-pa-none q-ma-sm text-center text-primary">
                    {{ pollData.header.address }}
                  </h6>
                </div>
                <div style="display: flex; justify-content: center">
                  <h6 class="q-pa-none q-ma-sm text-center text-primary">
                    <a>{{ pollData.header.email }}</a>
                  </h6>
                </div>
              </div>
            </div>
          </q-card-section>
        </div>
      </q-card-section>
      <q-card-section class="q-py-xl">
        <div
          v-html="pollData.textBannerReedme.description"
          class="textDescription"
        />
      </q-card-section>
      <q-card-actions class="text-primary justify-center q-pt-xl">
        <q-btn
          unelevated
          label="Close"
          color="primary"
          @click="closePage"
          align="center"
          class="col-12 col-sm-auto"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import { IPoll } from "../../models/Poll";
import { PollService } from "../../services/PollService";

export default defineComponent({
  name: "PollRulesPage",
  data() {
    return {
      pollData: <IPoll>{},
      pollService: new PollService(),
    };
  },
  methods: {
    closePage() {
      window.close();
    },
    showPage() {
      return (
        this.pollData && this.pollData.header && this.pollData.header.title
      );
    },
  },
  async mounted() {
    this.pollData = await this.pollService.getPollConfig();
  },
});
</script>
    
<style scoped>
.image-div-justify {
  justify-content: center;
  align-self: center;
}
</style>