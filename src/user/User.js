import { prisma } from "../database/prisma.js";
import { verifyUUID } from "../utils/verifyID.js";
import { createHash } from "../services/createHash.js";

export const defineResLocals = (req, res, next) => {
  res.locals.table = "user";
  next();
};

export async function getAllUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req, res, next) {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new Error("Usuário não existente");

    next();
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const { id, name, email, username, password, picture } = req.body;

    await verifyFieldsUnique({ id, username, email });

    const create = { name, email, username };
    create.password = await createHash(password);

    if (picture) create.picture = picture;

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
    const { name, email, username, password, picture } = req.body;

    const updates = {};

    if (name) updates.name = name;
    if (email) updates.email = email;
    if (username) updates.username = username;
    if (picture) updates.picture = picture;
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

    const user = await prisma.user.findFirst(filter);

    if (!user) throw new Error("Usuário não existente");

    await prisma.user.delete(filter);

    next();
  } catch (err) {
    next(err);
  }
}
