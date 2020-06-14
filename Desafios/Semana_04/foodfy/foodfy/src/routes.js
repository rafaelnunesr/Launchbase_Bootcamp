const express = require('express')
const routes = express.Router()

const multer = require('./app/middlewares/multer')

const AdminController = require('./app/controller/AdminController')
const PublicController = require('./app/controller/PublicController')

routes.get('/admin', AdminController.index)
routes.get('/admin/recipes/create', AdminController.newRecipe)
routes.post('/admin/recipes', multer.array('photos', 5), AdminController.recipePost)
routes.get('/admin/recipes/:id', AdminController.showRecipe)
routes.get('/admin/recipes/:id/edit', AdminController.editRecipe)
routes.put('/admin/recipes', multer.array('photos', 5), AdminController.RecipePut)

routes.get('/admin/chefs/create', AdminController.newChef)
routes.get('/admin/recipes', AdminController.index)
routes.get('/admin/chefs', AdminController.chefs)
routes.post('/admin/chefs', multer.single('photos'), AdminController.chefPost)
routes.get('/admin/chefs/:id', AdminController.showChef)
routes.get('/admin/chefs/:id/edit', AdminController.editChef)


routes.get('/', PublicController.index)
routes.get('/about', PublicController.about)
routes.get('/recipes/:id', PublicController.showRecipe)
routes.get('/chefs/:id', PublicController.showChef)
routes.get('/chefs', PublicController.chefs)
routes.get('/recipes', PublicController.recipes)

module.exports = routes