import { Router } from "express";
import { createComment } from "./createComment.js";
import { deleteComment } from "./deleteComment.js";
import { updateComment } from "./updateComment.js";

const router = Router();
export const commentController = router;

router.post("/", async (req, res) => {
  const { userId } = req;
  const comment = await createComment({ ...req.body, userId });
  res.status(201).json(comment);
});

router.patch("/:id", async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  const comment = await updateComment({ ...req.body, id, userId });
  res.json(comment);
});

router.delete("/:id", async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  await deleteComment({ id, userId });
  res.send();
});
