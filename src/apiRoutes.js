import { Router } from "express";
import * as cache from "./cache/Cache.js";
import * as postsController from "./controller/Post.js";
import * as authenticate from "./controller/Authenticate.js";
import { userRouter } from "./user/userController.js";

const routes = Router();

routes.post("/login", authenticate.authenticate);
routes.post("/refresh_token", authenticate.refreshToken);

routes.post("/users", userRouter);

routes
  .route("/posts")
  .post(authenticate.isAuthenticated, postsController.create)
  .get(authenticate.isAuthenticated, postsController.getPosts);

routes
  .route("/posts/:id")
  .get(
    authenticate.isAuthenticated,
    postsController.defineResLocals,
    cache.getData,
    postsController.getPostForId,
    cache.setData
  )
  .put(
    authenticate.isAuthenticated,
    postsController.defineResLocals,
    postsController.update,
    cache.setData
  )
  .patch(
    authenticate.isAuthenticated,
    postsController.defineResLocals,
    postsController.update,
    cache.setData
  )
  .delete(
    authenticate.isAuthenticated,
    postsController.defineResLocals,
    postsController.remove,
    cache.delData
  );

export const apiRoutes = routes;
