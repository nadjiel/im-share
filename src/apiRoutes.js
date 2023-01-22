import { Router } from "express";
import * as cache from "./controller/Cache.js";
import * as usersController from "./controller/User.js";
import * as photosController from "./controller/Photo.js";
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
  .route("/photos")
  .post(authenticate.isAuthenticated, photosController.create)
  .get(authenticate.isAuthenticated, photosController.getPhotos);

routes
  .route("/photos/:id")
  .get(
    authenticate.isAuthenticated,
    photosController.defineResLocals,
    cache.getData,
    photosController.getPhotoForId,
    cache.setData
  )
  .put(
    authenticate.isAuthenticated,
    photosController.defineResLocals,
    photosController.update,
    cache.setData
  )
  .patch(
    authenticate.isAuthenticated,
    photosController.defineResLocals,
    photosController.update,
    cache.setData
  )
  .delete(
    authenticate.isAuthenticated,
    photosController.defineResLocals,
    photosController.remove,
    cache.delData
  );

export const apiRoutes = routes;
