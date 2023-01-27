import { prisma } from "../database/prisma.js";
import { redis } from "./redis.js";

export async function setData(req, res, next) {
  try {
    const { id } = req.params;
    const { table } = res.locals;

    const user = await prisma[table].findFirst({
      where: { id },
    });

    await redis.set(`${table}_${id}`, JSON.stringify(user), {
      EX: 3600,
    });

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function getData(req, res, next) {
  try {
    const { id } = req.params;
    const { table } = res.locals;

    const objUser = await redis.get(`${table}_${id}`);

    if (objUser === null) next();
    else res.json(JSON.parse(objUser));
  } catch (err) {
    next(err);
  }
}

export async function delData(req, res, next) {
  try {
    const { id } = req.params;
    const { table } = res.locals;

    await redis.del(`${table}_${id}`);
    res.status(204).send("Excluído com sucesso");
  } catch (err) {
    next(err);
  }
}
