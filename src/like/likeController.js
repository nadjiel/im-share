import { Router } from "express";
import { db } from "../database/db.js";

const router = Router();
export const likeController = router;

router.post("/", async (req, res) => {
  const { userId } = req;
  const { postId } = req.body;
  const post = await db.create({ data: { userId, postId } });
  res.status(201).json(post);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const like = await db.like.findUniqueOrThrow({ where: { id } });

  const { userId } = req;
  if (like.userId !== userId) {
    throw new Error("Unauthorized post patch");
  }

  db.like.delete({ where: { id } });
});
