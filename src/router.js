const express = require("express")

// const photosController = require("./controller/Fotos")
const usersController = require("./controller/User")

const router = express.Router()

router.get("/api/v1/users", usersController.getAllUsers)
router.post("/api/v1/users", usersController.createUser)

router.route("/api/v1/users/:id")
    .get(usersController.getUserForId)
    .put(usersController.updateUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

// router.get("/api/v1/photos", photosController.getFotos)

module.exports = router