const Redis = require("ioredis");

const redisClient = new Redis();

redisClient.on("error", (err) => {
  console.log(err);
});

module.exports = {
  async getDataRedis(_search) {
    return await redisClient.get(_search);
  },
  async setDataRedis(_key, _send) {
    return await redisClient.set(_key, JSON.stringify(_send));
  },
};
