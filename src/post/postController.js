import { Router } from "express";
import { db } from "../database/db.js";
import { getAllPosts } from "./getAllPosts.js";

const router = Router();
export const postController = router;

router.get("/", async (req, res) => {
  const posts = await getAllPosts();
  res.json(posts);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await db.post.findUniqueOrThrow({ where: { id } });
  res.json(post);
});

router.post("/", async (req, res) => {
  const { description } = req.body;
  const data = { description };
  // todo add user id by req
  const post = await db.post.create({ data });
  res.status(201).json(post);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const data = { description };
  // todo add authorization
  await db.post.update({ where: { id }, data });
  res.json({ data });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await db.post.findUniqueOrThrow({ where: { id } });
  await db.post.delete(filter);
  res.send();
});
