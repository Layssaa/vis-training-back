const { redisClient } = require("../database/_redis");

async function setDataRedis(_key, _send) {
  console.log("SET REDIS");
  console.log(_key);
  console.log(_send);
  
  return await redisClient.set(_key, JSON.stringify(_send));
}

module.exports = { setDataRedis };
