import { prisma } from "../../database/prisma.js";

export async function getUserByUsername(username) {
  const user = await prisma.user.findUnique({
    where: { username },
    include: { photos: { include: { user: true } } },
  });

  if (!user) throw new Error("Usuário não existente");
  return user;
}
