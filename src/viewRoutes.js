import dayjs from "dayjs";
import { v2 } from "cloudinary";
import { Router } from "express";
import { signIn } from "./auth/signIn.js";
import { CLOUDINARY_SECRET, GOOGLE_CLIENT_ID } from "./env.js";
import duration from "dayjs/plugin/duration.js";
import { getPost } from "./post/getPostById.js";
import { createPost } from "./post/createPost.js";
import { deletePost } from "./post/deletePost.js";
import { updatePost } from "./post/updatePost.js";
import { getAllPosts } from "./post/getAllPosts.js";
import { generateToken } from "./auth/generatedToken.js";
import { authMiddleware } from "./auth/authMiddleware.js";
import { createComment } from "./comment/createComment.js";
import { deleteComment } from "./comment/deleteComment.js";
import { getUserByUsername } from "./user/getUserByUsername.js";
import { updateComment } from "./comment/updateComment.js";
import { getUserById } from "./user/getUserById.js";
import { updateUser } from "./user/updateUser.js";
import { deleteUser } from "./user/deleteUser.js";
import { validateSignature } from "./upload/validateSignature.js";

dayjs.extend(duration);
const oneWeekAsSeconds = dayjs.duration({ week: 1 }).asSeconds();

const routes = Router();
export const viewRoutes = routes;

routes.use(authMiddleware);

routes.get("/sign-in", async (req, res) => {
  if (req.logged) {
    return res.redirect("/");
  }
  res.render("auth/signIn", { GOOGLE_CLIENT_ID });
});

routes.get("/profile", async (req, res) => {
  const user = await getUserById(req.userId);
  return res.render("user/profile", { user });
});

routes.post("/logout", async (req, res) => {
  res.clearCookie("Authorization");
  res.redirect("/");
});

routes.get("/me", async (req, res) => {
  const { userId } = req;
  if (!userId) return res.redirect("/");

  const user = await getUserById(userId);
  res.redirect("/@" + user.username);
});

routes.post("/user", async (req, res) => {
  const user = await signIn(req.body.credential);
  const access = generateToken(user.id, oneWeekAsSeconds);
  const expires = dayjs().add(7, "days").toDate();
  res.cookie("Authorization", access, { expires });
  res.redirect("/");
});

routes.get("/@:username", async (req, res) => {
  const { username } = req.params;
  const { userId } = req;
  const user = await getUserByUsername(username);
  res.render("user/user", { user, userId });
});

routes.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const post = await getPost(id);
  res.render("post/post", { post });
});

routes.post("/post/:id/delete", async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  await deletePost({ id, userId });
  res.redirect("/");
});

routes.post("/comment/:id/delete", async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  const comment = await deleteComment({ id, userId });
  res.redirect("/post/" + comment.postId);
});

routes.post("/user/:id/delete", async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  await deleteUser({ id, userId });
  res.clearCookie("Authorization");
  res.redirect("/");
});

routes.post("/post/:id/update", async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  const { description } = req.body;
  await updatePost({ id, userId, description });
  res.redirect("/post/" + id);
});

routes.post("/comment/:id/update", async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  const comment = await updateComment({ ...req.body, id, userId });
  res.redirect("/post/" + comment.postId);
});

routes.post("/user/:id/update", async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  let picture = undefined;
  const { publicId, version, signature } = req.body;
  if (publicId) {
    validateSignature({ publicId, signature, version });
    picture = publicId;
  }

  const user = await updateUser({ ...req.body, picture, id, userId });
  res.redirect("/@" + user.username);
});

routes.post("/post/:postId/comment", async (req, res) => {
  const { userId } = req;
  const { postId } = req.params;
  await createComment({ ...req.body, userId, postId });
  res.redirect("/post/" + postId);
});

routes.get("/publish", async (req, res) => {
  if (!req.userId) {
    return res.redirect("/sign-in");
  }
  res.render("post/publish");
});

routes.post("/publish", async (req, res) => {
  const { publicId, version, signature } = req.body;
  validateSignature({ publicId, signature, version });
  const image = publicId;

  const { userId } = req;
  const { description } = req.body;

  const post = await createPost({ image, userId, description });
  res.redirect("/post/" + post.id);
});

routes.get("/", async (req, res) => {
  let posts = await getAllPosts();
  res.render("post/home", { posts });
});

routes.use(async (req, res) => {
  res.status(404).render("common/notFound");
});
