import { createClient } from 'redis'

export const redis = createClient();

async function connectar() {
    redis.on('connect', (err) => console.log("BD Redis conectado"))
    redis.on('error', (err) => console.log("Redis Client Error", err))
    await redis.connect();
}

connectar()