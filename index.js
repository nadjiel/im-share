import "express-async-errors";
import cors from "cors";
import express from "express";
import nunjucks from "nunjucks";
import { apiRoutes } from "./src/apiRoutes.js";
import { viewRoutes } from "./src/viewRoutes.js";

const errorHandling = (err, req, res, next) => {
  res.status(500).json({
    msg: err.message,
    success: false,
  });
};

const app = express();

app.use(cors());
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

app.use(errorHandling);

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.info(`Aplicação rodando em http://localhost:${port}`)
);
