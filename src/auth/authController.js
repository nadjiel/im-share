import dayjs from "dayjs";
import bcrypt from "bcrypt";
import { Router } from "express";
import { db } from "../database/db.js";
import duration from "dayjs/plugin/duration.js";
import { generateToken } from "./generatedToken.js";

const router = Router();
export const authController = router;

dayjs.extend(duration);

const secondInHour = dayjs.duration({ hours: 1 }).asSeconds();
const secondInYear = dayjs.duration({ years: 1 }).asSeconds();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await db.user.findFirstOrThrow({ where: { username } });

  const passwordEqual = await bcrypt.compare(password, user.password);

  if (!passwordEqual) {
    return res.status(403).json({ error: "Usuário ou senha incorretos" });
  }

  const access = generateToken(user.id, secondInHour);
  const refresh = generateToken(user.id, secondInYear);

  await savedTokenInBd(refresh, user.id);
  res.status(201).json({ refresh, access });
});

router.post("/refresh-token", async (req, res, next) => {
  const { refresh } = req.body;

  if (!refresh) {
    return res.status(400).json({
      error: "É necessário passar o refresh token para renovar o acesso",
    });
  }

  const dataToken = await db.refreshToken.findFirst({
    where: { token: refresh },
  });

  const tokenExpire = dayjs().isAfter(dayjs.unix(dataToken?.expires));

  if (!dataToken || tokenExpire) {
    return res.status(401).json({
      error: "Token invalido",
    });
  }

  const access = generatedToken(dataToken.userId, secondInHour);
  res.status(201).json({ access });
});
