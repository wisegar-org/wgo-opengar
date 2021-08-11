import { EmailOptions, EmailServer } from '@wisegar-org/wgo-opengar-core';

export class EmailService {
  async sendEmail(from: string, to: string, subject: string, html: string) {
    await EmailServer.sendEmail(<EmailOptions>{
      from: from,
      to: to,
      subject: subject,
      html: html,
    }).catch((err) => console.log(err));
  }
}
