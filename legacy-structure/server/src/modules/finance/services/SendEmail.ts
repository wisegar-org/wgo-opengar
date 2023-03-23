import { ReadStream } from 'fs';
import nodemailer from 'nodemailer';

export async function SendEmail(
    toEmail: string, 
    subject: string, 
    body: string, 
    attach: ReadStream) {
        
        var host: string = process.env.HOST_EMAIL || ''
        var port: number = parseInt(process.env.PORT_EMAIL || '25')
        var user: string = process.env.USER_EMAIL || ''
        var pass: string = process.env.PASS_EMAIL || ''

        let transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: false, // true for 465, false for other ports
        auth: {
            user: user, // generated ethereal user
            pass: pass, // generated ethereal password
        },
        });
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
        from: '"Wisegar" <info@wisegar.org>', // sender address
        to: toEmail, // list of receivers
        subject: subject, // Subject line
        text: body, // plain text body
        attachments: [
            {   // utf-8 string as an attachment
                filename: 'invoice.pdf',
                content: attach
            },
            ],
        });
    
        console.log("Message sent: %s", info.messageId);
  }