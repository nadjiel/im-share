const prisma = require("../database/PrismaClient")
const redis = require("../database/redis")

const setPessoa = async (req, res, next) => {
    try {
        const { id } = req.params
        const { table } = res.locals
        
        const user = await prisma[table].findFirst({
            where: { id }
        })
    
        await redis.set(`${table}_${id}`, JSON.stringify(user), {
            EX: 3600
        })

        res.status(201).json(user)
    } catch (err) {
        next(err)
    }
}

const getPessoa = async (req, res, next) => {
    try {
        const { id } = req.params
        const { table } = res.locals

        const objUser = await redis.get(`${table}_${id}`)

        if (objUser === null) next()
        else res.json((JSON.parse(objUser)));
    } catch (err) {
        next(err)
    }
}


const delPessoa = async (req, res, next) => {
    try {
        const { id } = req.params
        const { table } = res.locals
    
        await redis.del(`${table}_${id}`)
        res.status(204).send("Excluido com sucesso")
    } catch (err) {
        next(err)
    }
}

module.exports = { setPessoa, getPessoa, delPessoa }