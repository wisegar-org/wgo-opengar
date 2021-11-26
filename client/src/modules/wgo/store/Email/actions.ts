import {
  EmailFromToAppInputGql,
  EmailInputGql,
  EmailToAddressAndAppInputGql,
  EmailToAppInputGql
} from 'src/graphql';
import { ActionTree } from 'vuex';
import { StateInterface } from 'src/store';
import { EmailStateInterface } from './state';
import { EmailService } from '../../services/EmailService';
import { ServiceProvider } from '@wisegar-org/wgo-opengar-shared';

const emailService: EmailService = ServiceProvider.GetScoped(EmailService);

export const emailActions = {
  sendEmail: 'sendEmail',
  sendEmailToApp: 'sendEmailToApp',
  sendEmailFromToApp: 'sendEmailFromToApp',
  sendEmailFromToAddressAndApp: 'sendEmailFromToAddressAndApp'
};

const actions: ActionTree<EmailStateInterface, StateInterface> = {
  async sendEmail({}, arg: EmailInputGql): Promise<boolean | null> {
    const result = await emailService.sendEmail(arg);
    return result;
  },
  async sendEmailToApp({}, arg: EmailToAppInputGql): Promise<boolean | null> {
    const result = await emailService.sendEmailToApp(arg);
    return result;
  },
  async sendEmailFromToApp(
    {},
    arg: EmailFromToAppInputGql
  ): Promise<boolean | null> {
    const result = await emailService.sendEmailFromToApp(arg);
    return result;
  },
  async sendEmailFromToAddressAndApp(
    {},
    arg: EmailToAddressAndAppInputGql
  ): Promise<boolean | null> {
    const result = await emailService.sendEmailFromToAddressAndApp(arg);
    return result;
  }
};

export default actions;
