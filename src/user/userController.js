import { Router } from "express";

export const userRoutes = Router();

userRoutes.post("/", async function (req, res) {
  const { id, name, email, username, password, picture } = req.body;

  await verifyFieldsUnique({ id, username, email });

  const create = { name, email, username };
  create.password = await createHash(password);

  if (picture) create.picture = picture;

  if (await verifyUUID(id)) create.id = id;

  const user = await prisma.user.create({
    data: create,
  });

  res.status(201).json(user);
});
