import { prisma } from "../database/prisma.js";
import { createHash } from "../services/createHash.js";
import { verifyUUID, verifyTableID } from "../services/verifyID.js";

async function verifyFieldsUnique(verify, idUpdate = null) {
  const userCurrent = await prisma.user.findFirst({
    where: verify,
  });

  if (userCurrent && userCurrent?.id !== idUpdate) {
    if (userCurrent.id === verify.id)
      throw new Error("Esse ID entra em conflito a outro id de usuário");
    if (userCurrent.email === verify.email)
      throw new Error("Esse Email já está em uso");
    if (userCurrent.username === verify.username)
      throw new Error("Esse username já pertence a algum usuário");
  }
}

export function defineResLocals (req, res, next) {
  res.locals.table = "user";
  next();
};

export async function getAllUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { username: "desc" }
    });
    
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req, res, next) {
  try {
    const { id } = req.params;

    const userExists = await verifyTableID(id, "user");

    if (!userExists) throw new Error("Usuário não existente");

    next();
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const { id, name, email, username, password, post_profile } = req.body;

    await verifyFieldsUnique({ id, username, email });

    const create = { name, email, username };
    create.password = await createHash(password);

    if (post_profile) create.post_profile = post_profile;

    if (await verifyUUID(id)) create.id = id;

    const user = await prisma.user.create({
      data: create,
    });

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const { id } = req.params;
    const { name, email, username, password, post_profile } = req.body;

    const updates = {};

    if (name) updates.name = name;
    if (email) updates.email = email;
    if (username) updates.username = username;
    if (post_profile) updates.post_profile = post_profile;
    if (password) updates.password = await createHash(password);

    if (Object.keys(updates).length === 0)
      throw new Error("Sem campos de update.");

    await verifyFieldsUnique({ email, username }, id);

    await prisma.user.update({
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

    const user = await prisma.user.findUnique(filter);

    if (!user) throw new Error("Usuário não existente");

    await prisma.user.delete(filter);

    next();
  } catch (err) {
    next(err);
  }
}
