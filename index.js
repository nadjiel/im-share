import express from "express"
import cors from "cors"
import nunjucks from 'nunjucks'
import { apiRoutes } from "./src/apiRoutes.js";

const errorHandling = (err, req, res, next) => {
  res.status(500).json({
    msg: err.message,
    success: false,
  });
};

function notFoundFallback(req, res, next) {
  res.status(404).sendFile('public/404.html', { root: '.' });
}

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/v1', apiRoutes)

app.set("view engine", "njk");
nunjucks.configure("views", {
  express: app,
  noCache: true,
  autoescape: true,
});

app.use(express.static('public'));

app.use(notFoundFallback)
app.use(errorHandling);

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Aplicação rodando em http://localhost:${port}`))