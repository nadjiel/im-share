import { v2 } from "cloudinary";
import { Router } from "express";
import { CLOUDINARY_SECRET } from "./env.js";
import { createPost } from "./post/createPost.js";
import { getAllPosts } from "./post/getAllPosts.js";
import { getUserByUsername } from "./user/getUserByUsername.js";

const routes = Router();
export const viewRoutes = routes;

routes.get("/@:username", async (req, res) => {
  const { username } = req.params;
  const user = await getUserByUsername(username);
  res.render("pages/user", { user });
});

routes.get("/publish", async (req, res) => {
  res.render("pages/publish");
});

routes.post("/publish", async (req, res) => {
  console.log(req.body);
  const { publicId, version, signature } = req.body;
  const expectedSignature = v2.utils.api_sign_request(
    { public_id: publicId, version },
    CLOUDINARY_SECRET
  );

  if (expectedSignature !== signature) {
    throw Error("Invalid image signature");
  }
  const { description } = req.body;
  const image = publicId;

  const post = await createPost({ image, description });
  res.redirect("/@yo");
});

routes.get("/", async (req, res) => {
  let posts = await getAllPosts();
  res.render("pages/index", { posts });
});

routes.use(async (req, res) => {
  res.status(404).render("pages/notFound");
});
