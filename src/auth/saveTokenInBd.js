async function saveTokenInBd(token, userId) {
  const expires = dayjs().add(365, "day").unix();
  await db.refreshToken.deleteMany({ where: { userId } });
  await db.refreshToken.create({ data: { token, expires, userId } });
}
