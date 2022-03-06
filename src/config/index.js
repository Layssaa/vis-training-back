require("dotenv").config("../env");

module.exports = {
  SECRET: process.env.SECRET,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_HOST: process.env.MONGO_HOST,
  PORT: process.env.PORT,
  HOST_DB: process.env.HOST_DB,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_PORT: process.env.MONGO_PORT,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  MAILER_PORT: process.env.MAILER_PORT,
  MAILER_HOST: process.env.MAILER_HOST,
  MAILER_USER: process.env.MAILER_USER,
  MAILER_PASS: process.env.MAILER_PASS,
};
