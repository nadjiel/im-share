import { db } from "../database/db.js";

export function getAllPosts() {
  return db.post.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
}
