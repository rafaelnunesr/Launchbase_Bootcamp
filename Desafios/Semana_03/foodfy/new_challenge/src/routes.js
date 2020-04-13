const express = require('express')
const routes = express.Router()

const recipes = require('./app/controllers/recipes')
const admin = require('./app/controllers/admin')
const general = require('./app/controllers/general')

routes.get('/', recipes.index)
routes.get('/about', recipes.about)
routes.get('/recipes', recipes.all)
routes.get('/chefs', recipes.chefs)

routes.get('/admin', admin.index)
routes.get('/admin/recipes/create', admin.createRecipe)
routes.get('/admin/recipes', admin.recipes)
routes.get('/admin/chefs', admin.chefs)
routes.get('/admin/chefs/new_chef', admin.createChef)
routes.post('/admin', admin.postChef)
routes.post('/admin/recipes', admin.postRecipe)
routes.get('/admin/chefs/:id/edit', admin.editChef)
routes.delete('/admin', admin.deleteChef)


routes.use(general.not_found)

module.exports = routes