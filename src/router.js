const express = require("express")

const photosController = require("./controller/Photo")
const usersController = require("./controller/User")

const authenticate = require("./controller/Authenticate")
const cache = require("./controller/Cache")

const router = express.Router()

router.post("/api/v1/login", authenticate.authenticate)
router.post("/api/v1/refresh_token", authenticate.refreshToken)

router.post("/api/v1/users", usersController.create)
router.get("/api/v1/users", authenticate.isAuthenticated, usersController.getAllUsers)

router.route("/api/v1/users/:id")
    .get(
        authenticate.isAuthenticated, 
        usersController.defineResLocals,
        cache.getData, 
        usersController.getUserForId, 
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
        usersController.delet, 
        cache.delData
    )

router.route("/api/v1/photos")
    .post(authenticate.isAuthenticated, photosController.create)
    .get(authenticate.isAuthenticated, photosController.getPhotos)

router.route("/api/v1/photos/:id")
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
        photosController.delet, 
        cache.delData
    )

module.exports = router