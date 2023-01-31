export function handleError(error, req, res, next) {
  console.error(error);
  let message = error.message;

  const prismaIdentifier = "\nInvalid `prisma";
  if (message && message.startsWith(prismaIdentifier)) {
    message = message.split("\n\n").at(-2);
  }

  res.status(500).json({ message, success: false });
}
