require("dotenv").config("../env");

module.exports = {
  MONGO_HOST: process.env.MONGO_HOST,
  PORT: process.env.PORT,
  HOST_DB: process.env.HOST_DB,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_PORT: process.env.MONGO_PORT,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
};
