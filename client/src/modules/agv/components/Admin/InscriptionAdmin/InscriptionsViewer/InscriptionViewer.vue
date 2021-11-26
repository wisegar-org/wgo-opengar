<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <q-input
          square
          outlined
          class="q-ma-sm"
          readonly
          v-model="inscription.nome"
          label="Nome"
        />
      </div>
      <div class="col-12 col-sm-6">
        <q-input
          square
          outlined
          class="q-ma-sm"
          readonly
          v-model="inscription.cognome"
          label="Cognome"
        />
      </div>
      <div class="col-12 col-sm-6">
        <q-input
          square
          outlined
          class="q-ma-sm"
          readonly
          :value="inscription.class || '-'"
          lazy-rules="ondemand"
          label="Classe frequentata"
        />
      </div>
      <div class="col-12 col-sm-6">
        <q-input
          square
          outlined
          class="q-ma-sm"
          readonly
          v-model="inscription.email"
          type="email"
          lazy-rules="ondemand"
          label="Indirizzo email"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          square
          outlined
          class="q-ma-sm"
          readonly
          v-model="inscription.phone"
          label="Telefono"
          type="number"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          square
          outlined
          class="q-ma-sm"
          readonly
          :value="getFormatDate(inscription.date)"
          label="Fecha di Iscrizione"
        />
      </div>
    </div>

    <q-input
      square
      outlined
      class="q-ma-sm"
      readonly
      v-model="inscription.message"
      autogrow
      label="Messaggio"
    />

    <q-card-actions class="text-primary">
      <q-btn
        unelevated
        color="primary"
        align="center"
        class="col-12 col-sm-auto"
        @click="() => close()"
        label="Close"
      />
    </q-card-actions>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import moment from 'moment';
import { AgvInscriptionResponseModel } from 'src/modules/agv/models/GraphqlModels';

@Component({})
export default class InscriptionViewer extends Vue {
  @Prop() close!: () => void;
  @Prop() showLoading!: (value: boolean) => unknown;
  @Prop({ required: true }) inscription!: AgvInscriptionResponseModel;

  getFormatDate(date: unknown) {
    return moment(date as string).format('DD/MM/YYYY');
  }
}
</script>
