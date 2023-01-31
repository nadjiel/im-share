import jwt from "jsonwebtoken";
import { JWT_KEY } from "../env.js";

export async function authMiddleware(req, res, next) {
  const authToken = req.cookies["Authorization"];
  if (!authToken) {
    return next();
  }

  try {
    const result = jwt.verify(authToken, JWT_KEY);
    const userId = result.sub;
    req.userId = userId;
    return next();
  } catch (e) {
    return next();
  }
}
