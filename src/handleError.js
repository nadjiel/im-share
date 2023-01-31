export function handleError(error, req, res, next) {
  res.status(500);
  console.error(error);

  let message = error.message;

  const prismaIdentifier = "\nInvalid `prisma";
  if (message && message.startsWith(prismaIdentifier)) {
    message = message.split("\n\n").at(-2);
  }

  const unauthorizedIdentifier = "Unauthorized";
  if (message && message.startsWith(unauthorizedIdentifier)) {
    res.status(401);
  }

  res.json({ message, success: false });
}
