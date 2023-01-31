import { Router } from "express";
import { db } from "../database/db.js";
import { createPost } from "./createPost.js";
import { getAllPosts } from "./getAllPosts.js";
import { getPost } from "./getPostById.js";

const router = Router();
export const postController = router;

router.get("/", async (req, res) => {
  const posts = await getAllPosts();
  res.json(posts);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await getPost(id);
  res.json(post);
});

router.post("/", async (req, res) => {
  const { description, image } = req.body;
  const post = createPost({ description, image });
  res.status(201).json(post);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await db.post.findUnique({ where: { id } });

  const { userId } = req;
  if (post.userId !== userId) {
    throw new Error("Unauthorized post patch");
  }

  const { description } = req.body;
  await db.post.update({ where: { id }, data: { description } });
  res.json({ data });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await db.post.findUniqueOrThrow({ where: { id } });
  await db.post.delete(filter);
  res.send();
});
