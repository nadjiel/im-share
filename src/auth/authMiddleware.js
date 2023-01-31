export async function authMiddleware(req, res, next) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ error: "Token está faltando" });
  }

  const [, token] = authToken.split(" ");

  try {
    jwt.verify(token, key_private);
    return next();
  } catch {
    return res.status(401).json({ error: "Token invalido" });
  }
}
