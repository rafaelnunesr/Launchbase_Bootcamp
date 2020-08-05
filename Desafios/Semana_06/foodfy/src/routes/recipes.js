const express = require('express')
const routes = express.Router()

const multer = require('../app/middlewares/multer')

const RecipeController = require('../app/controller/RecipeController')
const { isLoggedRedirect, onlyUsers, onlyAdminUsers, ifUserIsAdmin } =  require('../app/middlewares/session')


routes.get('/', onlyUsers, ifUserIsAdmin, RecipeController.index)
routes.get('/recipes/create', onlyUsers, ifUserIsAdmin, RecipeController.create)
//routes.post('/recipes', onlyUsers, multer.array('photos', 5), RecipeController.post)
routes.post('/recipes', onlyUsers, RecipeController.post)
routes.get('/recipes/:id', onlyUsers, RecipeController.show)
routes.get('/recipes/:id/edit', onlyUsers, RecipeController.edit)
routes.put('/recipes', onlyUsers, multer.array('photos', 5), RecipeController.put)
routes.delete('/recipes', onlyUsers, RecipeController.delete)

module.exports = routes