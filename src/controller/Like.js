import { prisma } from "../database/prisma.js";
import { verifyUUID, verifyTableID } from "../services/verifyID.js";

async function verifyFieldsUnique(id) {
    const likeExists = await verifyTableID(id, "like");

    if (likeExists) throw new Error("Esse ID já está vinculado a outra reação de like");
}

async function verifyFieldsForeign(userId, postId) {
  const userExists = await verifyTableID(userId, "user");
  const postExists = await verifyTableID(postId, "post");

  if (!userExists) throw new Error("ID de usuário enviado não existe");
  if (!postExists) throw new Error("ID de post enviado não existe");
}

export function defineResLocals(req, res, next) {
  res.locals.table = "like";
  next();
};

export async function getLikeForPost(req, res, next) {
  try {
    const { id } = req.params;

    const likes = prisma.like.findMany({
      where: { postId: id }
    })

    if (!likes && likes != []) throw new Error("Post não existente");
    
    res.json(likes)
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const { id, userId, postId } = req.body;

    await verifyFieldsUnique(id);
    await verifyFieldsForeign(userId, postId);

    const create = { userId, postId };

    if (await verifyUUID(id)) create.id = id;

    const post = await prisma.like.create({
      data: create,
    });

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const { id } = req.params;

    const filter = { where: { id } };

    const like = await prisma.like.findUnique(filter);

    if (!like) throw new Error("ID do post não existente");

    await prisma.like.delete(filter);

    next();
  } catch (err) {
    next(err);
  }
}
