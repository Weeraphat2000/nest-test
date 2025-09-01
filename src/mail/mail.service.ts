import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import * as ExcelJS from 'exceljs';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(to: string[], subject: string, cc: string[]) {
    const pathToTemplate = path.join(
      __dirname,
      '../../src/mail/template/html1.html',
    );
    console.log('Path to template:', pathToTemplate);

    const html = Handlebars.compile(
      fs.readFileSync('src/mail/template/html1.html', 'utf-8'),
    )({
      time: new Date().toLocaleString(),
      appName: 'Your App Name',
      name: 'User Name',
      verificationLink: 'http://google.com',
      year: new Date().getFullYear(),
    });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Users');
    // กำหนด column
    sheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Created At', key: 'createdAt', width: 20 },
    ];

    // เพิ่ม row data
    sheet.addRow({
      id: 1,
      name: 'Weeraphat',
      email: 'weeraphat@example.com',
      createdAt: new Date(),
    });
    sheet.addRow({
      id: 2,
      name: 'Somchai',
      email: 'somchai@example.com',
      createdAt: new Date(),
    });
    sheet.addRow({
      id: 3,
      name: 'Somsri',
      email: 'somsri@example.com',
      createdAt: new Date(),
    });

    const result = await this.mailerService.sendMail({
      to,
      subject,
      html,
      cc,
      attachments: [
        {
          filename: 'users.xlsx',
          content: await workbook.xlsx.writeBuffer(),
        },
        {
          filename: 'image.JPG',
          content: fs.readFileSync('src/mail/image/IMG_6176.JPG'),
        },
        {
          filename: 'image2.JPG',
          content: fs.readFileSync('src/mail/image/IMG_6215.JPG'),
        },
      ],
    });

    console.log('Email sent successfully:', result);
    return result;
  }
}
