import { db } from "../database/db.js";

export async function createPost({ image, userId, description }) {
  const post = await db.post.create({
    data: { image, userId, description },
  });
  return post;
}
