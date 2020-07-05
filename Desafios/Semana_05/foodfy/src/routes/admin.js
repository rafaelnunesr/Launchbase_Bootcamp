const express = require('express')
const routes = express.Router()

const multer = require('../app/middlewares/multer')

const AdminController = require('../app/controller/AdminController')

routes.get('/', AdminController.index)
routes.get('/recipes/create', AdminController.newRecipe)
routes.post('/recipes', multer.array('photos', 5), AdminController.recipePost)
routes.get('/recipes/:id', AdminController.showRecipe)
routes.get('/recipes/:id/edit', AdminController.editRecipe)
routes.put('/recipes', multer.array('photos', 5), AdminController.RecipePut)

routes.get('/chefs/create', AdminController.newChef)
routes.get('/recipes', AdminController.index)
routes.get('/chefs', AdminController.chefs)
routes.post('/chefs', multer.array('photo', 1), AdminController.chefPost)
routes.get('/chefs/:id', AdminController.showChef)
routes.get('/chefs/:id/edit', AdminController.editChef)
routes.put('/chefs', multer.array('photo', 1), AdminController.chefPut)
routes.delete('/chefs', AdminController.deleteChef)
routes.delete('/recipes', AdminController.deleteRecipe)

module.exports = routes