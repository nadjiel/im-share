import { prisma } from "../database/prisma.js"
import { verifyUUID } from "../services/verifyID.js"

async function verifyUserId(userId) {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    })

    return user !== null
}

async function verifyFieldsUnique(id) {
    const photo = await prisma.photo.findFirst({
        where: { id }
    })

    if (photo !== null)
        throw new Error("Esse ID já está vinculado a outra foto")

}

export const defineResLocals = (req, res, next) => {
    res.locals.table = "photo"
    next()
}

export async function getPhotos(req, res, next) {
    const response = await prisma.photo.findMany({
        orderBy: { createdAt: "desc" }
    })
    res.json(await response)
}

export async function getPhotoForId(req, res, next) {
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

export async function create(req, res, next) {
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

export async function update(req, res, next) {
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

export async function remove(req, res, next) {
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
