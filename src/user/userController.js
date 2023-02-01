import { Router } from "express";
import { db } from "../database/db.js";
import { deleteUser } from "./deleteUser.js";

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
  const data = { id, name, email, username, picture };
  const user = await updateUser(data)
  res.json(user);
});

router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  const { userId } = req;

  deleteUser({ id, userId })
  res.send();
});
