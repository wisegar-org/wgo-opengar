<template>
  <div class="q-pa-md">
    <div v-html="getContent(contactTitle)"></div>
    <div v-html="getContent(contactBody)"></div>
    <q-input
      :label="getContent(nameFieldLabel)"
      :placeholder="getContent(nameFieldPlaceholder)"
      v-model="name"
    />
    <q-input
      :label="getContent(emailFieldLabel)"
      :placeholder="getContent(emailFieldPlaceholder)"
      v-model="email"
      type="email"
    />
    <q-input
      :label="getContent(msgFieldLabel)"
      :placeholder="getContent(msgFieldPlaceholder)"
      v-model="msg"
      type="textarea"
    />
    <br />
    <div class="flex justify-center items-center">
      <q-btn
        unelevated
        :label="getContent(btnSendLabel)"
        color="primary"
        @click="() => sendEmail()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import {
  languageActions,
  languageGetters,
  languageNamespace
} from 'src/modules/wgo/store/Language';
import { emailActions, emailNamespace } from 'src/modules/wgo/store/Email';
import { EmailToAddressAndAppInputGql } from 'src/graphql';
import { componentsNamespace } from 'src/modules/wgo/store';
import { INotify } from 'src/modules/wgo/models';
import { componentsActionsKeys } from 'src/modules/wgo/store/ComponentsState';

@Component({
  components: {}
})
export default class ContactComponent extends Vue {
  @Action(emailActions.sendEmailFromToAddressAndApp, {
    namespace: emailNamespace
  })
  sendEmailAction!: (data: EmailToAddressAndAppInputGql) => Promise<boolean>;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  @Action(languageActions.registerTranslations, {
    namespace: languageNamespace
  })
  registerTranslations!: (data: unknown) => Promise<boolean>;
  @Getter(languageGetters.getTranslations, { namespace: languageNamespace })
  translationContent!: { [key: string]: string };

  contactTitle = 'WGO_CASINA_CONTACT_TITLE';
  contactBody = 'WGO_CASINA_CONTACT_BODY';

  nameFieldLabel = 'WGO_CASINA_CONTACT_FIELD_NAME_LABEL';
  nameFieldPlaceholder = 'WGO_CASINA_CONTACT_FIELD_NAME_PLACEHOLDER';

  emailFieldLabel = 'WGO_CASINA_CONTACT_FIELD_EMAIL_LABEL';
  emailFieldPlaceholder = 'WGO_CASINA_CONTACT_FIELD_EMAIL_PLACEHOLDER';

  msgFieldLabel = 'WGO_CASINA_CONTACT_FIELD_MESSAGE_LABEL';
  msgFieldPlaceholder = 'WGO_CASINA_CONTACT_FIELD_MESSAGE_PLACEHOLDER';

  btnSendLabel = 'WGO_CASINA_CONTACT_BUTTON_SEND_LABEL';

  subjectEmail = 'WGO_CASINA_CONTACT_EMAIL_SUBJECT';
  successEmailSend = 'WGO_CASINA_CONTACT_EMAIL_SUCCESS_MESSAGE';
  failEmailSend = 'WGO_CASINA_CONTACT_EMAIL_FAIL_MESSAGE';

  loading = true;

  name = '';
  email = '';
  msg = '';

  constructor() {
    super();
  }

  getContent(key: string) {
    return key in this.translationContent ? this.translationContent[key] : key;
  }

  async sendEmail() {
    this.loading = true;

    let body = `<p>${this.getContent(this.nameFieldLabel)}: ${this.name}</p>`;
    body += `<p>${this.getContent(this.emailFieldLabel)}: ${
      this.email
    }</p><br/>`;
    body += `<p>${this.msg.split('\n').join('</p><p>')}</p>`;

    if (
      await this.sendEmailAction(<EmailToAddressAndAppInputGql>{
        subject: this.getContent(this.subjectEmail),
        body: body,
        to: `<${this.email}> "${this.name}"`
      })
    ) {
      this.loading = false;
      this.notify({
        message: this.getContent(this.successEmailSend),
        type: 'negative'
      });
    } else {
      this.loading = false;
      this.notify({
        message: this.getContent(this.failEmailSend),
        type: 'negative'
      });
    }
  }

  async created() {
    await this.registerTranslations({
      [this.contactTitle]: false,
      [this.contactBody]: false,
      [this.nameFieldLabel]: false,
      [this.nameFieldPlaceholder]: false,
      [this.emailFieldLabel]: false,
      [this.emailFieldPlaceholder]: false,
      [this.msgFieldLabel]: false,
      [this.msgFieldPlaceholder]: false,
      [this.btnSendLabel]: false,
      [this.subjectEmail]: false,
      [this.successEmailSend]: false,
      [this.failEmailSend]: false
    });
    this.loading = false;
  }
}
</script>
