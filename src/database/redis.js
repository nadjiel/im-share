const { createClient } = require('redis')

const client = createClient();

const connectar = async () => {
    client.on('connect', (err) => console.log("BD Redis conectado"))
    client.on('error', (err) => console.log("Redis Client Error", err))
    await client.connect();
}

connectar()

module.exports = client