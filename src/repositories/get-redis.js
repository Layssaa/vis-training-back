const { redisClient } = require("../database/_redis");

async function getDataRedis(_search) {
  console.log('GET REDIS');
  console.log(_search);
  return await redisClient.get(_search);
}

module.exports = { getDataRedis };
