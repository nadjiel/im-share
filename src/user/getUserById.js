import { db } from "../database/db.js";

export async function getUserById(id) {
  return await db.user.findUnique({ where: { id } });
}
