import { db } from "../database/db.js";

// todo add user id by req
export async function createPost({ description, image }) {
  const post = await db.post.create({
    data: {
      image,
      description,
      userId: "8c43cba0-c5a1-4e8c-bf97-b52776ec95f4",
    },
  });
  return post;
}
