import nodemailer from 'nodemailer';
import { env } from 'process';
import { generateToken } from './common.util';
import fs from 'fs'
import path from 'path';

export async function sendEmail(email: string, token: string, url: string) {
  const filePath = path.join('src', 'templates', 'mail.html');
  const htmlContent = fs.readFileSync(filePath, 'utf-8');
  console.log("Email: ",email)
  console.log("TOKEK: ",token)
  console.log("URI: ", url)

  return new Promise<object>((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: env.MAIL_HOST,
      port: 2525,
    auth: {
      user: "fe416821c3f105",
      pass: "1b20e273eb4e8e",
    },
      tls: { rejectUnauthorized: false }
    })

    const personalizedTemplate = htmlContent
    .replace('[name/email]', email)
    .replace('[token]', token)
    .replace('[url]', url)
    .replace('[company]', 'Attendance')
    .replace('[customer portal]', 'Attendance')
    .replace('[company]', 'Attendance')

  const mailOptions = {
    from: "tunasalem@gmail.com",
    to: email,
    subject: "Test Email",
    text: url,
    html: personalizedTemplate,
  };

    transporter.sendMail(mailOptions, (error, result) => {
      console.log(result)
      console.log(error)
      result ? resolve(result) : reject(error)
    })
  })
}
