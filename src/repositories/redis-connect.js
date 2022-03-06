const { redisClient } = require("../database/redis");

module.exports = {
  async getDataRedis(_search) {
    return JSON.parse(await redisClient.get(_search));
  },
  async setDataRedis(_key, _send) {
    return await redisClient.set(_key, JSON.stringify(_send));
  },
  async setSessionRedis(_key, _send) {
    return await redisClient.set(_key, JSON.stringify(_send), "EX", 3600);
  },
};
