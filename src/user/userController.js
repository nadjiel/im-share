import { Router } from "express";
import { db } from "../database/db.js";

const router = Router();
export const userRouter = router;

router.get("/", async function (req, res) {
  const users = await db.user.findMany({
    orderBy: { username: "desc" },
  });
  res.json(users);
});

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  const user = await db.user.findFirstOrThrow({
    where: { id },
  });
  res.json(user);
});

router.patch("/:id", async function (req, res) {
  const { id } = req.params;
  const { name, email, username, picture } = req.body;
  const data = { name, email, username, picture };
  await db.user.update({ where: { id }, data });
});

router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  const { userId } = req;
  const user = await db.user.findUniqueOrThrow({ where: { id } });
  if (user.id !== userId) {
    throw new Error("Unauthorized user deletion");
  }
  await db.user.delete({ where: { id } });
});
