const express = require("express")

// const photosController = require("./controller/Fotos")
const usersController = require("./controller/User")
const authenticate = require("./controller/Authenticate")

const router = express.Router()

router.post("/api/v1/login", authenticate.authenticate)
// router.post("/api/v1/refresh_token", authenticate.refreshToken)

router.get("/api/v1/users", usersController.getAllUsers)
router.post("/api/v1/users", usersController.createUser)

router.route("/api/v1/users/:id")
    .get(authenticate.isAuthenticated, usersController.getUserForId)
    .put(usersController.updateUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

// router.get("/api/v1/photos", photosController.getFotos)

module.exports = router