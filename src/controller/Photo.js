const prisma = require("../database/PrismaClient")
const verifyUUID = require("../services/verifyID")

const verifyUserId = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    })

    return user !== null
}

const verifyFieldsUnique = async (id) => {
    const photo = await prisma.photo.findFirst({
        where: { id }
    })

    if (photo !== null)
        throw new Error("Esse ID já está vinculado a outra foto")

}

const defineResLocals = (req, res, next) => {
    res.locals.table = "photo"
    next()
}

const getPhotos = async (req, res, next) => {
    const response = await prisma.photo.findMany({
        orderBy: { createdAt: "desc" }
    })
    res.json(await response)
}

const getPhotoForId = async (req, res, next) => {
    try {
        const { id } = req.params

        const photo = await prisma.photo.findUnique({
            where: { id }
        })

        if (!photo) throw new Error("Photo não existente")

    } catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    try {
        const { id, userId } = req.body

        await verifyFieldsUnique(id)

        const create = { userId }

        if (await verifyUUID(id)) create.id = id

        const userExists = await verifyUserId(userId)

        if (!userExists)
            throw new Error("ID de usuário enviado não existe")

        const photo = await prisma.photo.create({
            data: create
        })

        res.status(201).json(photo)
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const { userId } = req.body

        if (!userId) throw new Error("Sem campos de update.")

        const userExists = await verifyUserId(userId)

        if (!userExists)
            throw new Error("ID de usuário enviado não existe")

        await prisma.photo.update({
            where: { id },
            data: { userId }
        })

        next()
    } catch (err) {
        next(err)
    }
}

const delet = async (req, res, next) => {
    try {
        const { id } = req.params

        const filter = { where: { id } }

        const photo = await prisma.photo.findFirst(filter)

        if (!photo) throw new Error("ID de foto não existente")

        await prisma.photo.delete(filter)

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = { getPhotos, getPhotoForId, create, update, delet, defineResLocals }