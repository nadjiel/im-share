import { Router } from "express";
import { db } from "../database/db.js";
import { updateUser } from "./updateUser.js";
import { deleteUser } from "./deleteUser.js";
import { getUserById } from "./getUserById.js";

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
  const user = await getUserById(id);
  res.json(user);
});

router.patch("/:id", async function (req, res) {
  const { id } = req.params;
  const { userId } = req;
  const user = await updateUser({ ...req.body, id, userId });
  res.json(user);
});

router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  const { userId } = req;

  await deleteUser({ id, userId });
  res.send();
});
