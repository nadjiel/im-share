import { db } from "../database/db.js";

export async function getPost(id) {
  const post = await db.post.findUniqueOrThrow({
    where: { id },
    include: { user: true },
  });
  return post;
}
