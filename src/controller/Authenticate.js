const dayjs = require('dayjs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const duration = require('dayjs/plugin/duration')
const prisma = require("../database/PrismaClient")

const key_private = process.env.KEY_JWT

dayjs.extend(duration)

const secondInHour = dayjs.duration({ hours: 1 }).asSeconds() 
const secondInYear = dayjs.duration({ years: 1 }).asSeconds()

const generatedToken = (id, expiresIn) => {
    const token = jwt.sign({}, key_private, {
        subject: String(id),
        expiresIn
    })
    return token
}

const savedTokenInBd = async (token, userId) => {
    const expires = dayjs().add(365, "day").unix()

    await prisma.refreshToken.deleteMany({
        where: { userId }
    })

    await prisma.refreshToken.create({
        data: { token, expires, userId }
    })
}

const authenticate = async (req, res, next) => {
    const { username, password } = req.body
    
    const userExists = await prisma.user.findFirst({
        where: { username }
    })

    const error = "Usuario ou senha incorretos"

    if (!userExists) {
        return res.status(400).json({ error })
    }

    const passwordEqual = await bcrypt.compare(password, userExists.password)

    if (!passwordEqual) {
        return res.status(400).json({ error })
    }

    const access = generatedToken(userExists.id, secondInHour)
    const refresh = generatedToken(userExists.id, secondInYear)

    await savedTokenInBd(refresh, userExists.id)

    res.status(201).json({ refresh, access })
}

const refreshToken = async (req, res, next) => {
    const { refresh } = req.body

    if (!refresh) {
        return res.status(400).json({
            error: "É nescessario passar o refresh token para renovar o access" 
        })
    }

    const dataToken = await prisma.refreshToken.findFirst({
        where: { 
            token: refresh 
        }
    })

    const tokenExpire = dayjs().isAfter(dayjs.unix(dataToken?.expires))

    if (!dataToken || tokenExpire) {
        return res.status(401).json({ 
            error: "Token invalido" 
        })
    }

    const access = generatedToken(dataToken.userId, secondInHour)
    res.status(201).json({ access })
}

const isAuthenticated = async (req, res, next) => {
    const authToken = req.headers.authorization

    if (!authToken) {
        return res.status(401).json({
            error: "Token está faltando"
        })
    }

    const [ , token ] = authToken.split(" ")

    try {
        jwt.verify(token, key_private)
        return next()
    } catch {
        return res.status(401).json({
            error: "Token invalido"
        })
    }
}

module.exports = { authenticate, isAuthenticated, refreshToken }