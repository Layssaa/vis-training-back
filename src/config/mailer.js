import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

import { MAILER_HOST, MAILER_PORT, MAILER_USER, MAILER_PASS } from "./index.js";

const transport = nodemailer.createTransport({
  host: MAILER_HOST,
  port: MAILER_PORT,
  auth: {
    user: MAILER_USER,
    pass: MAILER_PASS,
  },
});

transport.use(
  "compile",
  hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve("./src/views/"),
    },
    viewPath: path.resolve("./src/views/"),
    extName: ".html",
  })
);

export default transport;
