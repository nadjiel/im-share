const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require("../database/PrismaClient")

const key_private = process.env.KEY_JWT

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

    const token = jwt.sign({}, key_private, {
        subject: String(userExists.id),
        expiresIn: "3600s"
    })

    res.status(201).json({ token })
}

const isAuthenticated = async (req, res, next) => {
    const authToken = req.header.authorization

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

module.exports = { authenticate, isAuthenticated }