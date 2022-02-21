const { redisClient } = require("../database/_redis");

async function setDataRedis(_key, _send) {
  await redisClient.set(_key, JSON.stringify(_send));
}

module.exports = { setDataRedis };
