export async function getUserByUsername(username) {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) throw new Error("Usuário não existente");
}
