import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('email')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  async sendMail() {
    const result = await this.mailService.sendMail(
      ['weeraphat.main@gmail.com', 'devin60s2000@gmail.com'],
      'subject',
      ['weeraphat@kkumail.com'],
    );

    return { message: 'Email sent successfully', result };
  }
}
