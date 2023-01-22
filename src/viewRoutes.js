import { Router } from "express"

const routes = Router()
export const viewRoutes = routes

routes.get('/user', (req, res) => {
    res.render('pages/user', { user: {} })
})

routes.get('/', (req, res) => {
    res.render('pages/index')
})
