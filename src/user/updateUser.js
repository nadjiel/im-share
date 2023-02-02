import { db } from "../database/db.js";

export async function updateUser({ id, bio, name, userId, username }) {
  const user = await db.user.findUniqueOrThrow({ where: { id } });

  if (user.id !== userId) {
    throw new Error("Unauthorized user patch");
  }

  return await db.user.update({
    where: { id },
    data: { bio, name, username },
  });
}
