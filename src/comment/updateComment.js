import { db } from "../database/db.js";

export async function updateComment({ id, userId, text }) {
  const comment = await db.comment.findUnique({ where: { id } });
  if (comment.userId !== userId) {
    throw new Error("Unauthorized comment patch");
  }
  return await db.comment.update({
    where: { id },
    data: { text },
  });
}
