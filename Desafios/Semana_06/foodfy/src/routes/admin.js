const express = require('express')
const routes = express.Router()

const multer = require('../app/middlewares/multer')

const AdminController = require('../app/controller/AdminController')
const { isLoggedRedirect, onlyUsers, onlyAdminUsers } =  require('../app/middlewares/session')

routes.get('/', onlyUsers, AdminController.index)
routes.get('/recipes/create', onlyUsers, AdminController.newRecipe)
routes.post('/recipes', onlyUsers, multer.array('photos', 5), AdminController.recipePost)
routes.get('/recipes/:id', onlyUsers, AdminController.showRecipe)
routes.get('/recipes/:id/edit', onlyUsers, AdminController.editRecipe)
routes.put('/recipes', onlyUsers, multer.array('photos', 5), AdminController.RecipePut)

routes.get('/chefs/create', onlyUsers, onlyAdminUsers, AdminController.newChef)
routes.get('/recipes', onlyUsers, AdminController.index)
routes.get('/chefs', onlyUsers, AdminController.chefs)
routes.post('/chefs', onlyUsers, onlyAdminUsers, multer.array('photo', 1), AdminController.chefPost)
routes.get('/chefs/:id', onlyUsers, AdminController.showChef)
routes.get('/chefs/:id/edit', onlyUsers, onlyAdminUsers, AdminController.editChef)
routes.put('/chefs', onlyUsers, onlyAdminUsers, multer.array('photo', 1), AdminController.chefPut)
routes.delete('/chefs', onlyUsers, onlyAdminUsers, AdminController.deleteChef)
routes.delete('/recipes', onlyUsers, AdminController.deleteRecipe)

module.exports = routes
