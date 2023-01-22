import { Router } from "express"
import { getPhotos } from "./controller/Photo.js"

const routes = Router()
export const viewRoutes = routes

routes.get('/@:username', (req, res) => {
    const user = {
        posts: [{}, {}, {}]
    }
    res.render('pages/user', { user })
})

routes.get('/', async (req, res) => {
    const posts = await getPhotos()
    res.render('pages/index', { posts })
})
