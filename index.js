import "express-async-errors";
import "./src/upload/configureUpload.js";
import cors from "cors";
import express from "express";
import nunjucks from "nunjucks";
import cookieParser from "cookie-parser";
import { CLOUDINARY_SERVER } from "./src/env.js";
import { apiRoutes } from "./src/apiRoutes.js";
import { viewRoutes } from "./src/viewRoutes.js";
import { handleError } from "./src/handleError.js";

const app = express();

app.locals.imageServer = CLOUDINARY_SERVER;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "njk");
nunjucks.configure("src/views", {
  express: app,
  noCache: true,
  autoescape: true,
});

app.use(express.static("public"));

app.use("/api/v1", apiRoutes);
app.use(viewRoutes);

app.use(handleError);

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.info(`Aplicação rodando em http://localhost:${port}`)
);
