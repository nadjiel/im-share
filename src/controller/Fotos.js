const prismaClient = require("../database/PrismaClient")

const getFotos = async (req, res, next) => {
    const response = await prismaClient.fotos.findMany()
    res.json(await response)
}

module.exports = { getFotos }