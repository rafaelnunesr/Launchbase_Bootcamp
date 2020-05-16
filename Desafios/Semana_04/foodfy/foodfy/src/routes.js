const express = require('express')
const routes = express.Router()

const multer = require('./app/middlewares/multer')

const AdminController = require('./app/controller/AdminController')

routes.get('/admin', AdminController.index)
routes.get('/admin/recipes/create', AdminController.newRecipe)
routes.post('/admin/recipes', multer.array('photos', 5), AdminController.recipePost)
routes.get('/admin/recipes/:id/edit', AdminController.editRecipe)

routes.get('/admin/chefs/create', AdminController.newChef)


module.exports = routes