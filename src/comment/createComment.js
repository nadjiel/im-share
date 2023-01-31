import { db } from "../database/db.js";

export async function createComment({ text, postId, userId }) {
  const comment = await db.comment.create({
    data: { text, postId, userId },
  });
  return comment;
}
