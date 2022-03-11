import { redisClient } from "../database/redis.js";

async function getDataRedis(_search) {
  return JSON.parse(await redisClient.get(_search));
}

async function setDataRedis(_key, _send) {
  return await redisClient.set(_key, JSON.stringify(_send));
}

async function setSessionRedis(_key, _send) {
  return await redisClient.set(_key, JSON.stringify(_send), "EX", 3600);
}

export { getDataRedis, setDataRedis, setSessionRedis };
