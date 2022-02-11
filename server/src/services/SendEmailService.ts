import nodemailer from "nodemailer";
import fs from "fs";
import handlebars from "handlebars";

interface IPasswordRecovery {
  email: string;
  templatePath: string;
  templateVariables: object;
  subject: string;
}

export class SendEmailService {
  async execute({
    email,
    templatePath,
    templateVariables,
    subject,
  }: IPasswordRecovery) {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const templateFileContent = fs.readFileSync(templatePath).toString("utf8");
    const templateParse = handlebars.compile(templateFileContent);
    const htmlTemplate = templateParse(templateVariables);

    const info = await transporter.sendMail({
      from: `"Pata e Palma" < ${process.env.EMAIL_ACCOUNT}>`,
      to: email,
      subject,
      html: htmlTemplate,
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
}
