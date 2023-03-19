import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport, SendMailOptions } from 'nodemailer'

@Injectable()
export class MailService {
    constructor(
        private readonly config: ConfigService,
    ) { }

    public async sendEmail(title: string, content: string, receiver: string): Promise<void> {
        const serverEmail = {
            service: this.config.get('MAIL_SERVICE'),
            auth: {
                user: this.config.get('MAIL_USER'),
                pass: this.config.get('MAIL_PASS')
            }
        };
        const transporter: Transporter = createTransport(serverEmail)
        const options: SendMailOptions = {
            from: serverEmail.auth.user,
            to: receiver,
            subject: title,
            html: content
        }
        await transporter.sendMail(options);
    }
}
