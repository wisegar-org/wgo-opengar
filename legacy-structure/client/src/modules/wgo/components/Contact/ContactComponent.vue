<template>
  <div class="q-pa-md">
    <div v-html="getContent(contactTitle)"></div>
    <div v-html="getContent(contactBody)"></div>
    <q-input
      :label="getContent(nameFieldLabel)"
      :placeholder="getContent(nameFieldPlaceholder)"
      :rules="[val => !!val || getContent(nameFieldRequiered)]"
      v-model="name"
    />
    <q-input
      :label="getContent(emailFieldLabel)"
      :placeholder="getContent(emailFieldPlaceholder)"
      v-model="email"
      :rules="[val => !!val || getContent(emailFieldRequiered)]"
      type="email"
    />
    <q-input
      :label="getContent(msgFieldLabel)"
      :placeholder="getContent(msgFieldPlaceholder)"
      v-model="msg"
      :rules="[val => !!val || getContent(msgFieldRequiered)]"
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { EmailToAddressAndAppInputGql } from '../../../../graphql';
import { INotify } from '../../models';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../store/ComponentsState';
import { emailActions, emailNamespace } from '../../store/Email';
import {
  languageActions,
  languageGetters,
  languageNamespace
} from '../../store/Language';

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

  @Prop() TranslationsKeys!: { [key: string]: boolean };
  @Prop() contactTitle!: string;
  @Prop() contactBody!: string;
  @Prop() nameFieldLabel!: string;
  @Prop() nameFieldPlaceholder!: string;
  @Prop() emailFieldLabel!: string;
  @Prop() emailFieldPlaceholder!: string;
  @Prop() msgFieldLabel!: string;
  @Prop() msgFieldPlaceholder!: string;
  @Prop() btnSendLabel!: string;
  @Prop() subjectEmail!: string;
  @Prop() successEmailSend!: string;
  @Prop() failEmailSend!: string;
  @Prop() nameFieldRequiered!: string;
  @Prop() emailFieldRequiered!: string;
  @Prop() msgFieldRequiered!: string;

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

    if (this.name && this.email && this.msg) {
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
    } else {
      this.loading = false;
      this.notify({
        message: this.getContent(this.failEmailSend),
        type: 'negative'
      });
    }
  }

  async created() {
    await this.registerTranslations(this.TranslationsKeys);
    this.loading = false;
  }
}
</script>
