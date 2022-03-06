const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const { MAILER_HOST, MAILER_PORT, MAILER_USER, MAILER_PASS } = require("./index");

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

module.exports = transport;
