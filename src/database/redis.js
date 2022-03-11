import Redis from "ioredis";

const redisClient = new Redis();

redisClient.on("error", (err) => {
  console.log(err);
});

export { redisClient };
