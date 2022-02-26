const { redisClient } = require("../database/_redis");

module.exports = {
  async getDataRedis(_search) {
    return await redisClient.get(_search);
  },
  async setDataRedis(_key, _send) {
    return await redisClient.set(_key, JSON.stringify(_send));
  },
};
