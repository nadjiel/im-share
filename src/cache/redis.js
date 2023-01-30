import { createClient } from "redis";

export const redis = createClient();

async function connect() {
  redis.on("connect", (err) => console.info("BD Redis conectado"));
  redis.on("error", (err) => console.error("Redis Client Error", err));
  await redis.connect();
}

connect();
