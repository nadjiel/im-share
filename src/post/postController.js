import { Router } from "express";
import { prisma } from "../database/prisma.js";

const router = Router();
export const postController = router;

router.get("/", async (req, res, next) => {
  const posts = await prisma.post.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(posts);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const post = await prisma.post.findUniqueOrThrow({ where: { id } });
  res.json(post);
});

router.post("/", async (req, res, next) => {
  const { description } = req.body;
  const data = { description };
  // todo add user id by req
  const post = await prisma.post.create({ data });
  res.status(201).json(post);
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { description } = req.body;
  const data = { description };
  // todo add authorization
  await prisma.post.update({ where: { id }, data });
  res.json({ data });
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const post = await prisma.post.findUniqueOrThrow({ where: { id } });
  await prisma.post.delete(filter);
  res.send();
});
