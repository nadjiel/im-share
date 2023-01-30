import { db } from "../database/db.js";

export async function getUserByUsername(username) {
  const user = await db.user.findUniqueOrThrow({
    where: { username },
    include: {
      posts: { include: { user: true }, orderBy: { createdAt: "desc" } },
      comments: { include: { post: { include: { user: true } }, user: true } },
    },
  });

  return user;
}
