import { EmailOptions, EmailServer } from '@wisegar-org/wgo-opengar-core';

export class EmailService {
  async sendEmail(from: string, to: string, subject: string, html: string) {
    let result;
    await EmailServer.sendEmail(<EmailOptions>{
      from: from,
      to: to,
      subject: subject,
      html: html,
    })
      .then((value: any) => {
        result = value;
      })
      .catch((error: any) => {
        result = error;
      });
    return result;
  }
}
