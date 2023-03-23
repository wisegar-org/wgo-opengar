<template>
  <Dialog
    :close="onClose"
    :showModal="showModal"
    :title="title"
    styleDialog="width: 500px; max-width: 90vw"
  >
    <template slot="content">
      <q-card-section class="row items-center">
        <q-avatar v-if="icon" :icon="icon" color="primary" text-color="white" />
        <span class="col q-ml-sm">{{ text }}</span>
      </q-card-section>
    </template>
    <template slot="buttons">
      <q-btn
        unelevated
        :label="cancelButton"
        color="primary"
        @click="onClose"
        class="col-12 col-sm-auto q-mt-sm q-mx-sm"
      />
      <q-btn
        unelevated
        :label="okButton"
        color="primary"
        @click="onConfirm"
        class="col-12 col-sm-auto q-mt-sm q-mx-sm"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Dialog from '../Dialog/Dialog.vue';

@Component({
  components: {
    Dialog
  }
})
export default class ConfirmDialog extends Vue {
  @Prop() showModal!: boolean;
  @Prop() okButton!: string;
  @Prop() cancelButton!: string;
  @Prop() text!: string;
  @Prop() title!: string;
  @Prop() icon!: string;
  @Prop() onConfirm!: () => unknown;
  @Prop() onClose!: () => unknown;
}
</script>
