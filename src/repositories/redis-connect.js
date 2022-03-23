import { redisClient } from "../database/redis.js";

async function getDataRedis(_search) {
  return JSON.parse(await redisClient.get(_search));
}

async function setDataRedis(_key, _send) {
  return await redisClient.set(_key, JSON.stringify(_send));
}

async function setDataWithTimestamp(_key, _send, _time) {
  return await redisClient.set(_key, JSON.stringify(_send), "EX", _time);
}

async function setSessionRedis(_key, _send) {
  return await redisClient.set(_key, JSON.stringify(_send), "EX", 3600);
}

async function deleteSessionRedis(_key) {
  return await redisClient.del(_key);
}

export {
  getDataRedis,
  setDataRedis,
  setSessionRedis,
  deleteSessionRedis,
  setDataWithTimestamp,
};
