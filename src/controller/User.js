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
        const { id, name, email, username, password, photo_profile } = req.body
    
        const create = { name, email, username }
        create.password = await hashPassword(password)

        if (id) create.id = Number(id)
        if (photo_profile) create.photo_profile = photo_profile

        const user = await prisma.user.create({
            data: create
        })
    
        res.status(201).json(user)
    } catch (err) {
        console.log(err)
        
        const listError = err.meta.target

        const fields = { }

        if (listError.includes("id")) {
            fields.id = "Esse ID entra em conflito a outro id de usuario"
        }
        if (listError.includes("email")) {
            fields.email = "Esse Email já está em uso"
        }
        if (listError.includes("username")) {
            fields.username = "Esse username já pertence a algum usuario"
        }

        res.status(400).json({ fields })
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
    
        res.status(201).json(user)
    } catch (err) {
        console.log(err)
        
        const listError = err.meta.target

        const fields = { }
        
        if (listError.includes("email")) {
            fields.email = "Esse Email já está em uso"
        }
        if (listError.includes("username")) {
            fields.username = "Esse username já pertence a algum usuario"
        }

        res.status(400).json({ fields })
    }
}

async function deleteUser(req, res, next) {
    try {
        const { id } = req.params
        const user = await prisma.user.delete({
          where: { id: Number(id) }
        })
        res.status(204).json(user)
        next()
    } catch (err) {
        console.log(err)
        res.status(400).json({ 
            error: "Usuário não existente" 
        })
    }
}

module.exports = { getAllUsers, getUserForId, createUser, updateUser, deleteUser }