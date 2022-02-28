import nodemailer from "nodemailer";
import hbs from "nomdemailer-express-handlebars";
import path from "path";

import { MAILER_HOST, MAILER_PORT, MAILER_USER, MAILER_PORT } from "./index";

export const transport = nodemailer.createTransport({
  host: MAILER_HOST,
  port: MAILER_PORT,
  auth: {
    user: MAILER_USER,
    pass: MAILER_PORT,
  },
});

transport.use(
  "compile",
  hbs({
    viewEngine: "handlebars",
    viewPath: path.resolve("./src/views"),
    extName: ".html",
  })
);
