import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET;
const NODE_ENV = process.env.NODE_ENV;
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const HOST_DB = process.env.HOST_DB;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_PORT = process.env.MONGO_PORT;
const REDIS_URI = process.env.REDIS_URI;
const REDIS_PORT = process.env.REDIS_PORT;
const MAILER_PORT = process.env.MAILER_PORT;
const MAILER_HOST = process.env.MAILER_HOST;
const MAILER_USER = process.env.MAILER_USER;
const MAILER_PASS = process.env.MAILER_PASS;

export {
  SECRET,
  NODE_ENV,
  MONGO_URI,
  PORT,
  HOST_DB,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PORT,
  REDIS_URI,
  REDIS_PORT,
  MAILER_PORT,
  MAILER_HOST,
  MAILER_USER,
  MAILER_PASS,
};
