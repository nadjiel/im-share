import { Router } from "express";
import { db } from "../database/db.js";

const router = Router();
export const likeController = router;

router.post("/", async (req, res) => {
  const { userId, postId } = req.body;
  // todo add authorization
  const data = { userId, postId };
  const post = await db.create({ data });
  res.status(201).json(post);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  // todo add authorization
  await db.like.findUniqueOrThrow({ where: { id } });
  db.like.delete({ where: { id } });
});
