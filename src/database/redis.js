import Redis from "ioredis";
import { REDIS_URI } from "../config/index.js";


const redisClient = new Redis(REDIS_URI);

redisClient.on("error", (err) => {
  console.log(err);
});

export { redisClient };
