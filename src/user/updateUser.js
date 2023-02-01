import { db } from "../database/db.js";

export async function updateUser({ id, name, email, username, picture }) {
  const user = await db.user.findUnique({ where: { id } });

  if (user.id !== id) {
    throw new Error("Unauthorized user patch");
  }

  const data = {}

  if (name) data.name = name
  if (email) data.email = email
  if (picture) data.picture = picture
  if (username) data.username = username

  return await db.user.update({ 
    where: { id }, 
    data 
  });
}
