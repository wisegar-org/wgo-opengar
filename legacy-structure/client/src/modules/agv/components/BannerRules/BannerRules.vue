<template>
  <div v-if="!!banner">
    <q-banner rounded dense class="bg-grey-3">
      <template v-slot:avatar>
        <q-intersection
          transition="rotate"
          :threshold="0.1"
          style="heigth: 150px"
        >
          <q-icon name="info" color="primary" size="60px" />
        </q-intersection>
      </template>
      <div v-html="banner.text" />

      <template v-slot:action>
        <q-btn
          unelevated
          color="primary"
          :label="banner.clickText"
          @click="openDialog"
        />
      </template>
    </q-banner>

    <Dialog
      :close="() => (showDialog = false)"
      :showModal="showDialog"
      :title="title"
    >
      <template slot="content">
        <div v-html="banner.description" class="textDescription q-pa-sm" />
        <q-card-actions class="text-primary justify-center">
          <q-btn
            unelevated
            label="Close"
            color="primary"
            @click="closeDialog"
            align="center"
            class="col-12 col-sm-auto"
          />
        </q-card-actions>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Dialog from '../../../wgo/components/Dialog/Dialog.vue';

@Component({
  components: {
    Dialog
  }
})
export default class BannerRules extends Vue {
  @Prop() banner!: { text: string; description: string; clickText: string };
  @Prop() title!: string;
  showDialog = false;

  openDialog(event: Event) {
    event.preventDefault();
    this.showDialog = true;
    return false;
  }

  closeDialog() {
    this.showDialog = false;
  }
}
</script>

<style scoped>
.textDescription {
  text-align: justify;
}
</style>
