import jwt from "jsonwebtoken";
import { JWT_KEY } from "../env.js";

export function generateToken(id, expiresIn) {
  const token = jwt.sign({}, JWT_KEY, { expiresIn, subject: String(id) });
  return token;
}
