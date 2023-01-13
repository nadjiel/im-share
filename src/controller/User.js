const prismaClient = require("../database/PrismaClient")

const getAllUsers = async (req, res, next) => {
    const users = await prisma.users.findMany()
    res.json(users)
}

const postUser = async (req, res, next) => {
    const { name, email, username, 
        password, photo_profile } = req.body

    const response = await prismaClient.users.create({
        data: {
            name, 
            email, 
            username, 
            password, 
            photo_profile
        }
    })

    res.json(await response)
}

module.exports = { getAllUsers, postUser }