import { db } from "../database/db.js";

export async function deleteComment({ id, userId }) {
  const comment = await db.comment.findUniqueOrThrow({ where: { id } });
  if (comment.userId !== userId) {
    throw new Error("Unauthorized comment delete");
  }
  return await db.comment.delete({ where: { id } });
}
