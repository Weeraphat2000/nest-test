import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'hun331202544@gmail.com',
          pass: process.env.PASS,
        },
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
