import IORedis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new IORedis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
  tls: {},
  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log("✅ Redis Connected");
});

redis.on("ready", () => {
  console.log("✅ Redis Ready");
});

redis.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});

export const subscriber = redis.duplicate();