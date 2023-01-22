import { prisma } from "../database/prisma.js";
import { verifyUUID } from "../services/verifyID.js";

async function verifyUserId(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return user !== null;
}

async function verifyFieldsUnique(id) {
  const post = await prisma.post.findFirst({
    where: { id },
  });

  if (post !== null) throw new Error("Esse ID já está vinculado a outra foto");
}

export const defineResLocals = (req, res, next) => {
  res.locals.table = "post";
  next();
};

export async function getPosts(req, res, next) {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
  return posts;
}

export async function getPostForId(req, res, next) {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) throw new Error("Post não existente");
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const { id, userId } = req.body;

    await verifyFieldsUnique(id);

    const create = { userId };

    if (await verifyUUID(id)) create.id = id;

    const userExists = await verifyUserId(userId);

    if (!userExists) throw new Error("ID de usuário enviado não existe");

    const post = await prisma.post.create({
      data: create,
    });

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) throw new Error("Sem campos de update.");

    const userExists = await verifyUserId(userId);

    if (!userExists) throw new Error("ID de usuário enviado não existe");

    await prisma.post.update({
      where: { id },
      data: { userId },
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

    const post = await prisma.post.findFirst(filter);

    if (!post) throw new Error("ID de foto não existente");

    await prisma.post.delete(filter);

    next();
  } catch (err) {
    next(err);
  }
}
