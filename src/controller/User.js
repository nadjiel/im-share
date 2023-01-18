const validateUuid = require('uuid-validate');
const bcrypt = require('bcrypt')

const prisma = require("../database/PrismaClient")

const hashPassword = async (password) => {
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    return await hash
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    } catch (err) {
        next(err)
    }
}

const verifyFieldsUnique = async (verify) => {
    const userCurrent = await prisma.user.findFirst({
        where: verify
    })

    if (userCurrent) {
        if (userCurrent.id === verify.id) 
            throw new Error("Esse ID entra em conflito a outro id de usuario")
        if (userCurrent.email === verify.email)
           throw new Error("Esse Email já está em uso")
        if (userCurrent.username === verify.username)
            throw new Error("Esse username já pertence a algum usuario")
    }
} 

const verifyUUID = (id) => {
    const mensage = "O id enviado não é um UUID"
    
    if (!id) return

    if (validateUuid(id)) create.id = id
    else throw new Error(mensage)
}

const getUserForId = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await prisma.user.findUnique({
            where: { id }
        })
        if (!user) throw new Error("Usuário não existente")
        res.json(user)
    } catch (err) {
        next(err)
    }
}

const createUser = async (req, res, next) => {
    try {
        const { id, name, email, username, password, photo_profile } = req.body

        await verifyFieldsUnique({ id, username, email })
        await verifyUUID(id)

        const create = { name, email, username }
        create.password = await hashPassword(password)

        if (photo_profile) create.photo_profile = photo_profile

        const user = await prisma.user.create({
            data: create
        })
    
        res.status(201).json(user)
    } catch (err) {
        next(err)
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
            throw new Error("Sem campos de update.")
        }

        await verifyFieldsUnique({ email, username })
    
        const user = await prisma.user.update({
          where: { id },
          data: updates
        })
    
        res.status(201).json(user)
    } catch (err) {
        next(err)
    }
}

async function deleteUser(req, res, next) {
    try {
        const { id } = req.params

        const filter = { where: { id } }
        
        const user = await prisma.user.findFirst(filter) 
        
        if (!user) throw new Error("Usuário não existente")
        
        await prisma.user.delete(filter)

        res.status(204).json(user)

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = { getAllUsers, getUserForId, createUser, updateUser, deleteUser }