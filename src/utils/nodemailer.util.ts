import nodemailer from 'nodemailer';
import { env } from 'process';
import { generateToken } from './common.util';
import fs from 'fs'
import path from 'path';

export async function sendEmail(email: string, token: string) {
  const filePath = path.join('src', 'templates', 'mail.html');
  const htmlContent = fs.readFileSync(filePath, 'utf-8');

  const transport = nodemailer.createTransport({
    host: env.MAIL_HOST,
    port: 2525,
    auth: {
      user: "fe416821c3f105",
      pass: "1b20e273eb4e8e",
    }
  });

  const mailOptions = {
    from: "tunasalem@gmail.com",
    to: email,
    subject: "Test Email",
    text: token
  }

  transport.sendMail(mailOptions, (err, info) => {
    if(err) {
      console.log(`Error sending mail: ${email} `, err.message);
    }else {
      console.log(`Email sent: ${email}`, info.response)
    }
  })
}
