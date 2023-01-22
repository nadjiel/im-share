const express = require("express")
const cors = require("cors")
const path = require('path')

const router = require("./src/router")

const errorHandling = (err, req, res, next) => {
    res.status(500).json({
      msg: err.message,
      success: false,
    });
};

const error404 = (req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
}

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

app.use(express.static(path.join(__dirname, 'public')));

app.use(error404)
app.use(errorHandling);

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Aplicação rodando em http://localhost:${port}`))