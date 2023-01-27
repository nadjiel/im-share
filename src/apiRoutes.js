import { Router } from "express";
import { userRouter } from "./user/userController.js";
import { postController } from "./post/postController.js";
import * as authenticate from "./controller/Authenticate.js";

const routes = Router();

routes.post("/login", authenticate.authenticate);
routes.post("/refresh_token", authenticate.refreshToken);

routes.use("/users", userRouter);
routes.use("/posts", postController);

export const apiRoutes = routes;
