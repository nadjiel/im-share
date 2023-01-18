const prisma = require("../../database/PrismaClient")
const redis = require("../../database/redis")

const setPessoa = async (req, res, next) => {
    try {
        const { id } = req.params
        
        const user = await prisma.user.findFirst({
            where: { id }
        })
    
        await redis.set(`users_${id}`, JSON.stringify(user), {
            EX: 3600
        })
    } catch (err) {
        next(err)
    }
}

const getPessoa = async (req, res, next) => {
    const { id } = req.params
    const objUser = await redis.get(`users_${id}`)

    if (objUser === null) {
        next()
    } else {
        res.json(JSON.parse(objUser))
    }
}


const delPessoa = async (req, res, next) => {
    const { id } = req.params
    await redis.del(`users_${id}`)
    res.status(204).send("Usuario deletado")
}

module.exports = { setPessoa, getPessoa, delPessoa }