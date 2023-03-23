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
      <q-input
        class="q-my-sm"
        filled
        v-model="formContact.email"
        type="email"
        standout="bg-primary text-white"
        label="Indirizzo email *"
        lazy-rules="ondemand"
        autocomplete="new-password"
        :rules="[val => (val && val.length > 0) || 'Il campo è obbligatiorio']"
      />
      <q-input
        class="q-my-sm"
        filled
        v-model="formContact.phone"
        standout="bg-primary text-white"
        label="Telefono *"
        lazy-rules="ondemand"
        type="number"
        autocomplete="new-password"
        :rules="[val => (val && val.length > 0) || 'Il campo è obbligatiorio']"
      />
      <q-input
        class="q-my-sm"
        filled
        v-model="formContact.message"
        standout="bg-primary text-white"
        type="textarea"
        autocomplete="new-password"
        label="Messaggio"
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
import { EmailToAddressAndAppInputGql } from '../../../../graphql';
import { INotify } from '../../../wgo/models';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../../wgo/store/ComponentsState';
import { emailActions, emailNamespace } from '../../../wgo/store/Email';

@Component({})
export default class ComitatoContactForm extends Vue {
  @Action(emailActions.sendEmailFromToAddressAndApp, {
    namespace: emailNamespace
  })
  sendEmail!: (data: EmailToAddressAndAppInputGql) => Promise<boolean>;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;
  @Prop({ required: true }) mailTo!: string;
  formContact = {
    nome: '',
    cognome: '',
    email: '',
    subject: 'Vorrei esserene parte',
    phone: '',
    message: ''
  };
  showLoader = false;

  async onSubmit() {
    this.showLoader = true;
    const content = this.formContact;
    let body = `<p>Nome: ${content.nome} ${content.cognome}</p>`;
    body += `<p>Indirizzo email: ${content.email}</p>`;
    body += `<p>Telefono: ${content.phone}</p></br>`;
    body += `<p>${content.message.split('\n').join('</p><p>')}</p>`;

    if (
      await this.sendEmail(<EmailToAddressAndAppInputGql>{
        subject: content.subject,
        body: body,
        to: `<${content.email}> "${content.nome} ${content.cognome}"`
      })
    ) {
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
        message: "L'invio della posta non è riuscito",
        type: 'negative'
      });
    }
  }

  onReset() {
    this.formContact = {
      nome: '',
      cognome: '',
      email: '',
      subject: 'Vorrei esserene parte',
      phone: '',
      message: ''
    };
  }
}
</script>
