const prisma = require("../database/PrismaClient")
const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    return await hash
}

const getAllUsers = async (req, res, next) => {
    const users = await prisma.user.findMany()
    res.json(users)
}

const getUserForId = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await prisma.user.findUnique({
            where: { id: Number(id) }
        })
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(400).json({ 
            error: "Ocorreu um error ao consultar usuario" 
        })
    }
}

const createUser = async (req, res, next) => {
    try {
        const { name, email, username, password } = req.body
    
        const hashPass = await hashPassword(password);
    
        const user = await prisma.user.create({
            data: {
                name,
                email, 
                username, 
                password: hashPass
            }
        })
    
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(400).json({ 
            error: "Ocorreu um error ao registrar usuario" 
        })
    }
}

async function updateUser(req, res, next) {
    try {
        const { id } = req.params
        const { name, email, username, 
            password, photo_profile } = req.body
    
        const updates = {}
    
        if (name) updates.name = name
        if (email) updates.email = email
        if (username) updates.username = username
        if (photo_profile) updates.photo_profile = photo_profile
        if (password) updates.password = await hashPassword(password)
    
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: "Sem campos de update." })
        }
    
        const user = await prisma.user.update({
          where: { id: Number(id) },
          data: updates
        })
    
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(40).json({ 
            error: "Usuário não existente" 
        })
    }
}

async function deleteUser(req, res, next) {
    try {
        const { id } = req.params
        const user = await prisma.user.delete({
          where: { id: Number(id) }
        })
        res.json(user)
        next()
    } catch (err) {
        console.log(err)
        res.status(400).json({ 
            error: "Usuário não existente" 
        })
    }
}

module.exports = { getAllUsers, getUserForId, createUser, updateUser, deleteUser }