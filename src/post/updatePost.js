import { db } from "../database/db.js";

export async function updatePost({ id, userId, description }) {
  const post = await db.post.findUnique({ where: { id } });

  if (post.userId !== userId) {
    throw new Error("Unauthorized post patch");
  }

  return await db.post.update({
    where: { id },
    data: { description },
  });
}
