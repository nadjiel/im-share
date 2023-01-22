import { Router } from "express";
import { getPhotos } from "./controller/Photo.js";
import { getUserByUsername } from "./user/services/getUserByUsername.js";

const routes = Router();
export const viewRoutes = routes;

routes.get("/@:username", async (req, res) => {
  const { username } = req.params;
  const user = await getUserByUsername(username);
  console.log(user);
  res.render("pages/user", { user });
});

routes.get("/", async (req, res) => {
  const posts = await getPhotos();
  res.render("pages/index", { posts });
});
