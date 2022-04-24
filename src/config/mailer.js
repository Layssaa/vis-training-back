import nodemailer from "nodemailer";

import { MAILER_HOST, MAILER_PORT, MAILER_USER, MAILER_PASS } from "./index.js";

import SES from "aws-sdk/clients/ses.js";
import { setSessionRedis } from "../repositories/redis-connect.js";
import { createRandomNumber } from "../utils/create-random-code.js";
import { buildHtml } from "../views/html-email.js";

const sesClient = new SES({
  region: "us-east-1",
});

const transport = nodemailer.createTransport({
  service: "gmail",
  host: MAILER_HOST,
  port: MAILER_PORT,
  auth: {
    user: MAILER_USER,
    pass: MAILER_PASS,
  },
  logger: false,
  debug: false,
});

export async function sendMail({ email, name, type, id }) {
  await sesClient
    .sendEmail({
      Source: `Vis Training App <${MAILER_USER}>`,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: await switchSendMail[type].subject(name),
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: await switchSendMail[type].body(id),
            Charset: "UTF-8",
          },
        },
      },
    })
    .promise();
}

const switchSendMail = {
  recoveryPassword: {
    subject: (name) => `${name} aqui está o seu token de RECUPERAÇÃO`,
    body: async (_id) => {
      const token = createRandomNumber();
      await setSessionRedis(`session:reset-password:${token}`, {
        token,
        id: _id,
      });
      return buildHtml(token);
    },
  },
  registerUser: {
    subject: (name) => `Bem-vindo ao Vis ${name}, `,
    body: () => `Seja bem-vindo ao VIS `,
  },
  confirmMail: {
    subject: (name) => `${name} confirme seu email!`,
    body: () =>
      `<p> Clique no link e confirme seu e-mail para ativarmos sua conta <br/> <a href="${token}" target="_blank"> link </a> <p>`,
  },
};

export default transport;
