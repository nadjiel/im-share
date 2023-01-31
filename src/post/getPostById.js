import { db } from "../database/db.js";

export async function getPost(id) {
  const post = await db.post.findUniqueOrThrow({
    where: { id },
  });
  return post;
}
