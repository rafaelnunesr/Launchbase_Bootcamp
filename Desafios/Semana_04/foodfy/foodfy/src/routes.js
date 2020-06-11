const express = require('express')
const routes = express.Router()

const multer = require('./app/middlewares/multer')

const AdminController = require('./app/controller/AdminController')
const Public = require('./app/controller/Public')

routes.get('/admin', AdminController.index)
routes.get('/admin/recipes/create', AdminController.newRecipe)
routes.post('/admin/recipes', multer.array('photos', 5), AdminController.recipePost)
routes.get('/admin/recipes/:id', AdminController.showRecipe)
routes.get('/admin/recipes/:id/edit', AdminController.editRecipe)
routes.put('/admin/recipes', multer.array('photos', 5), AdminController.RecipePut)

routes.get('/admin/chefs/create', AdminController.newChef)


routes.get('/', Public.index)
routes.get('/about', Public.about)
routes.get('/recipes/:id', Public.show)
routes.get('/chefs/:id', Public.showChef)
routes.get('/chefs', Public.chefs)
routes.get('/recipes', Public.recipes)

module.exports = routes