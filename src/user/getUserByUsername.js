import { db } from "../database/db.js";

export async function getUserByUsername(username) {
  const user = await db.user.findUniqueOrThrow({
    where: { username },
    include: {
      posts: { include: { user: true } },
      comments: { include: { post: { include: { user: true } }, user: true } },
    },
  });

  return user;
}
