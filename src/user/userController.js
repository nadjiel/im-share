import { Router } from "express";
import { prisma } from "../database/prisma.js";
import { createHash } from "../services/createHash.js";

const router = Router();
export const userRouter = router;

router.post("/", async function (req, res) {
  const { name, email, username, password, picture } = req.body;

  const data = { name, email, username, picture };
  data.password = await createHash(password);
  const user = await prisma.user.create({ data });

  res.status(201).json(user);
});

router.get("/", async function (req, res) {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  const user = await prisma.user.findFirstOrThrow({
    where: { id },
  });
  res.json(user);
});

router.patch("/:id", async function (req, res) {
  const { id } = req.params;
  const { name, email, username, password, picture } = req.body;

  const data = { name, email, username, picture };
  if (password) data.password = await createHash(password);

  await prisma.user.update({ where: { id }, data });
});

router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  const user = await prisma.user.findFirst({ where: { id } });
  if (!user) throw new Error("Usuário não existente");
  // todo add authorization
  await prisma.user.delete(filter);
});
