<template>
  <q-card flat>
    <q-form @submit="onSubmit" @reset="onReset">
      <q-input
        class="q-my-sm"
        filled
        v-model="formContact.nome"
        standout="bg-primary text-white"
        label="Nome *"
        lazy-rules="ondemand"
        autocomplete="new-password"
        :rules="[val => (val && val.length > 0) || 'Il campo è obbligatiorio']"
      />
      <q-input
        class="q-my-sm"
        filled
        v-model="formContact.cognome"
        standout="bg-primary text-white"
        label="Cognome *"
        lazy-rules="ondemand"
        autocomplete="new-password"
        :rules="[val => (val && val.length > 0) || 'Il campo è obbligatiorio']"
      />
      <q-select
        v-if="!!pollConfig"
        class="q-my-sm"
        filled
        v-model="formContact.class"
        :label="`${pollConfig.labels.class} *`"
        :options="pollConfig.options.class"
        standout="bg-primary text-white"
        lazy-rules="ondemand"
        autocomplete="new-password"
        :rules="[
          val => (!!val && val.length > 0) || 'Il campo è obbligatiorio'
        ]"
      />
      <q-input
        class="q-my-sm"
        filled
        v-model="formContact.email"
        standout="bg-primary text-white"
        type="email"
        lazy-rules="ondemand"
        label="Indirizzo email *"
        autocomplete="new-password"
        :rules="[val => (val && val.length > 0) || 'Il campo è obbligatiorio']"
      />
      <q-input
        class="q-my-sm"
        filled
        v-model="formContact.phone"
        standout="bg-primary text-white"
        label="Telefono *"
        type="number"
        lazy-rules="ondemand"
        autocomplete="new-password"
        :rules="[val => (val && val.length > 0) || 'Il campo è obbligatiorio']"
      />
      <q-input
        class="q-my-sm"
        filled
        v-model="formContact.message"
        standout="bg-primary text-white"
        type="textarea"
        label="Messaggio"
        autocomplete="new-password"
        lazy-rules="ondemand"
      />

      <div class="row display-flex justify-center q-my-sm">
        <q-btn unelevated label="Invia" type="submit" color="primary" />
      </div>
    </q-form>

    <Loader :loading="showLoader" />
  </q-card>
</template>

<script lang="ts">
import { Dialog } from 'quasar';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { emailActions, emailNamespace } from 'src/modules/wgo/store/Email';
import { EmailToAddressAndAppInputGql } from 'src/graphql';
import {
  componentsActionsKeys,
  componentsNamespace
} from 'src/modules/wgo/store/ComponentsState';
import { INotify } from 'src/modules/wgo/models';
import {
  AgvEventResponseModel,
  AgvInscriptionInputModel
} from '../../models/GraphqlModels';
import {
  agvInscriptionsActionsKeys,
  agvInscriptionsNamespace
} from '../../store/AGVInscriptions';
import { PollService } from '../../services';
import { IPoll } from '../../models/Poll';

@Component({})
export default class ContactInscriptionFrom extends Vue {
  @Action(emailActions.sendEmailFromToAddressAndApp, {
    namespace: emailNamespace
  })
  sendEmail!: (data: EmailToAddressAndAppInputGql) => Promise<boolean>;
  @Action(agvInscriptionsActionsKeys.agvCreateInscription, {
    namespace: agvInscriptionsNamespace
  })
  createInscription!: (
    agvInscription: AgvInscriptionInputModel
  ) => Promise<boolean>;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;
  @Prop() event!: AgvEventResponseModel;
  formContact = {
    id: 0,
    nome: '',
    cognome: '',
    email: '',
    phone: '',
    message: '',
    class: ''
  };
  showLoader = false;
  pollConfig: IPoll | null = null;

  async onSubmit() {
    this.showLoader = true;

    if (
      await this.createInscription(<AgvInscriptionInputModel>{
        ...this.formContact,
        eventId: this.event.id
      })
    ) {
      await this.sendEmailMessage();
      this.showLoader = false;
      Dialog.create({
        title: 'Assemblea dei Genitori Vezia',
        message: 'Grazie!',
        cancel: {
          unelevated: true,
          color: 'primary',
          label: 'Chiudere'
        },
        ok: false,
        persistent: true
      });
      this.onReset();
    } else {
      this.showLoader = false;
      this.notify({
        message: 'Iscrizione non riuscita',
        type: 'negative'
      });
    }
  }

  async sendEmailMessage() {
    const content = this.formContact;
    let body = `<p>Nome: ${content.nome} ${content.cognome}</p></br>`;
    body += `<p>Indirizzo email: ${content.email}</p></br>`;
    body += `<p>Telefono: ${content.phone}</p></br></br>`;
    body += `<p>${content.message.split('\n').join('</p><p>')}</p>`;
    const subject = `Iscrizione - ${this.event.title}`;

    if (
      await this.sendEmail(<EmailToAddressAndAppInputGql>{
        subject: `Oggetto: ${subject}`,
        body: body,
        to: `<${content.email}> "${content.nome} ${content.cognome}"`
      })
    ) {
      return true;
    } else {
      this.notify({
        message: "L'invio della posta non è riuscito",
        type: 'negative'
      });
      return false;
    }
  }

  onReset() {
    this.formContact = {
      id: 0,
      nome: '',
      cognome: '',
      email: '',
      phone: '',
      message: '',
      class: ''
    };
  }

  async mounted() {
    const pollService = new PollService();
    this.pollConfig = await pollService.getPollConfig();
  }
}
</script>
