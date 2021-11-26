import { Dialog } from 'quasar';
import { IFormPoll, IPoll } from '../../models/Poll';
import { PollService } from '../../services/PollService';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { emailActions, emailNamespace } from 'src/modules/wgo/store/Email';
import { EmailToAddressAndAppInputGql } from 'src/graphql';
import {
  componentsActionsKeys,
  componentsNamespace
} from '../../../wgo/store/ComponentsState';
import { INotify } from 'src/modules/wgo/models';

@Component({})
export default class PollComponent extends Vue {
  @Action(emailActions.sendEmailFromToAddressAndApp, {
    namespace: emailNamespace
  })
  sendEmail!: (data: EmailToAddressAndAppInputGql) => Promise<boolean>;
  @Action(componentsActionsKeys.notify, { namespace: componentsNamespace })
  notify!: (value: INotify) => void;

  @Prop() onClose!: () => void;
  @Prop() pollData!: IPoll;
  pollService: PollService;
  pollHtml: string;
  formPoll = <IFormPoll>{
    allergy: '',
    class: '',
    disposition: '',
    email: '',
    foodAllergy: '',
    foodIntolerance: '',
    interest: '',
    intolerance: '',
    name: '',
    parentEmail: '',
    parentName: '',
    phone: '',
    photo: ''
  };
  showLoader = false;
  /**
   *
   */
  constructor() {
    super();
    this.pollService = new PollService();
    this.pollHtml = '';

    const value = this.pollData.labels.yesOrNoHolder;
    this.formPoll.allergy = value;
    this.formPoll.disposition = value;
    this.formPoll.interest = value;
    this.formPoll.intolerance = value;
    this.formPoll.photo = value;
  }

  async onSubmit() {
    this.showLoader = true;
    const data = this.pollData;
    const form = this.formPoll;
    let body = `<p>${data.header.title}</p>`;
    body += `<p>${data.header.address}</p>`;
    body += `<p>${data.header.email}</p>`;
    body += `<p>${data.textEmail.header}</p></br></br></br></br></br></br>`;

    // body += `<p>${data.labels.email}: ${form.email}</p></br>`;
    body += `<p>${this.pollData.labels.childGroup}:</p></br>`;
    body += `<p>${data.labels.name}: ${form.name}</p>`;
    body += `<p>${data.labels.class}: ${form.class}</p>`;
    body += `<p>${data.labels.photo}: ${form.photo}</p>`;
    body += `<p>${data.labels.photoHelp}</p>`;
    body += `<p>${data.labels.allergy}: ${form.allergy}</p>`;
    body += `<p>${data.labels.foodAllergy}: ${
      form.allergy !== 'No' ? form.foodAllergy : '-'
    }</p>`;
    body += `<p>${data.labels.intolerance}: ${form.intolerance}</p>`;
    body += `<p>${data.labels.foodIntolerance}: ${
      form.intolerance !== 'No' ? form.foodIntolerance : '-'
    }</p></br></br></br></br></br>`;
    body += `<p>${this.pollData.labels.parentGroup}:</p></br>`;
    body += `<p>${data.labels.parentName}: ${form.parentName}</p>`;
    body += `<p>${data.labels.parentEmail}: ${form.parentEmail}</p>`;
    body += `<p>${data.labels.phone}: ${form.phone}</p></br></br></br></br></br>`;
    body += `<p>${data.labels.disposition}: ${form.disposition}</p></br>`;
    body += `<p>${data.labels.interest}: ${form.interest}</p> `;
    body += `<p>${data.textEmail.footer}</p></br></br>`;

    if (
      await this.sendEmail(<EmailToAddressAndAppInputGql>{
        subject: `Oggetto: ${this.pollData.header.subject}`,
        body: body,
        to: `<${form.parentEmail}> "${form.parentName}"`
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
      this.onClose();
    } else {
      this.showLoader = false;
      this.notify({
        message: "L'invio della posta non è riuscito",
        type: 'negative'
      });
    }
  }

  setYesOrNoValue(value: string) {
    this.formPoll.allergy = value;
    this.formPoll.disposition = value;
    this.formPoll.interest = value;
    this.formPoll.intolerance = value;
    this.formPoll.photo = value;
  }

  onReset() {
    return true;
  }
}
