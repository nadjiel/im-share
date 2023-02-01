import { db } from "../database/db.js";

export async function deletePost({ id, userId }) {
  const post = await db.post.findUniqueOrThrow({ where: { id } });

  if (post.userId !== userId) {
    throw new Error("Unauthorized post delete");
  }

  await db.post.delete({ where: { id } });
}
