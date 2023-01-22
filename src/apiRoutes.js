import { Router } from "express";
import * as cache from "./controller/Cache.js";
import * as usersController from "./controller/User.js";
import * as postsController from "./controller/Post.js";
import * as authenticate from "./controller/Authenticate.js";

const routes = Router();

routes.post("/login", authenticate.authenticate);
routes.post("/refresh_token", authenticate.refreshToken);

routes.post("/users", usersController.create);
routes.get("/users", authenticate.isAuthenticated, usersController.getAllUsers);

routes
  .route("/users/:id")
  .get(
    authenticate.isAuthenticated,
    usersController.defineResLocals,
    cache.getData,
    usersController.getUserById,
    cache.setData
  )
  .put(
    authenticate.isAuthenticated,
    usersController.defineResLocals,
    usersController.update,
    cache.setData
  )
  .patch(
    authenticate.isAuthenticated,
    usersController.defineResLocals,
    usersController.update,
    cache.setData
  )
  .delete(
    authenticate.isAuthenticated,
    usersController.defineResLocals,
    usersController.remove,
    cache.delData
  );

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
