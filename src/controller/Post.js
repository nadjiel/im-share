import { prisma } from "../database/prisma.js";
import { verifyUUID, verifyTableID } from "../services/verifyID.js";

async function verifyFieldsUnique(id) {
  const postExists = await verifyTableID(id, "post");

  if (postExists) throw new Error("Esse ID já está vinculado a outro post");
}

export function defineResLocals(req, res, next) {
  res.locals.table = "post";
  next();
};

export async function getAllPosts(req, res, next) {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
  res.json(posts)
}

export async function getPostForId(req, res, next) {
  try {
    const { id } = req.params;

    const postExists = await verifyTableID(id, "post");

    if (!postExists) throw new Error("Post não existente");
    
    next()
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const { id, userId, description, image } = req.body;

    await verifyFieldsUnique(id);

    const create = { userId, description, image };

    if (await verifyUUID(id)) create.id = id;

    const userExists = await verifyTableID(userId, "user");

    if (!userExists) throw new Error("ID de usuário enviado não existe");

    const post = await prisma.post.create({
      data: create,
    });
    console.log(post)

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const { id } = req.params;
    const { description, image } = req.body;

    const updates = {}

    if (image) updates.image = image
    if (description) updates.description = description

    if (Object.keys(updates).length === 0)
      throw new Error("Sem campos de update.");

    await prisma.post.update({
      where: { id },
      data: updates,
    });

    next();
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const { id } = req.params;

    const filter = { where: { id } };

    const post = await prisma.post.findUnique(filter);

    if (!post) throw new Error("ID do post não existente");

    await prisma.post.delete(filter);

    next();
  } catch (err) {
    next(err);
  }
}
