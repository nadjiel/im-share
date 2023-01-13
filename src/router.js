const express = require("express")

const photosController = require("./controller/Fotos")
const usersController = require("./controller/User")

const router = express.Router()

router.get("/api/v1/users", usersController.getAllUsers)
router.post("/api/v1/users", usersController.postUser)

// router.get("/api/v1/photos", photosController.getFotos)

module.exports = router