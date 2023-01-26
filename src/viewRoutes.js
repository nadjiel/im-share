import { Router } from "express";
import { getPosts } from "./controller/Post.js";
import { getUserByUsername } from "./user/services/getUserByUsername.js";

const routes = Router();
export const viewRoutes = routes;

routes.get("/@:username", async (req, res) => {
  const { username } = req.params;
  const user = await getUserByUsername(username);
  res.render("pages/user", { user });
});

routes.get("/publish", async (req, res) => {
  const uploadUrl = await generateUploadURL();
  res.render("pages/publish", { uploadUrl });
});

routes.get("/", async (req, res) => {
  let posts = await getPosts();
  res.render("pages/index", { posts });
});

routes.use(async (req, res) => {
  res.render("pages/notFound");
});
