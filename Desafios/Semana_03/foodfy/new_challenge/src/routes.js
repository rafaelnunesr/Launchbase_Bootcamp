const express = require('express')
const routes = express.Router()

const recipes = require('./app/controllers/recipes')
const admin = require('./app/controllers/admin')
const general = require('./app/controllers/general')

//PUBLIC VERSION
routes.get('/', recipes.index)
routes.get('/about', recipes.about)
routes.get('/recipes', recipes.all)
routes.get('/chefs', recipes.chefs)
routes.get('/recipes/:id', recipes.showRecipes)
routes.get('/chefs/:id', recipes.chefs)

//ADMIN RECIPES
routes.get('/admin', admin.index)
routes.get('/admin/recipes/create', admin.createRecipe)
routes.get('/admin/recipes', admin.showRecipes)
routes.post('/admin/recipes', admin.postRecipe)
routes.get('/admin/recipes/:id', admin.showRecipes)
routes.get('/admin/recipes/:id/edit', admin.editRecipe)
routes.put('/admin/recipes', admin.putRecipe)
routes.delete('/admin', admin.deleteRecipe)


//ADMIN CHEFS
routes.get('/admin/chefs/create', admin.createChef)
routes.post('/admin/chefs', admin.postChef)
routes.get('/admin/chefs/:id', admin.showChefs)
routes.get('/admin/chefs', admin.showChefs)
routes.get('/admin/chefs/:id/edit', admin.editChef)
routes.put('/admin/chefs', admin.putChef)
routes.delete('/admin', admin.deleteChef)


routes.use(general.not_found)

module.exports = routes

/*

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
routes.get('/admin/chefs/:id', admin.chef)
routes.delete('/admin', admin.deleteChef)


routes.use(general.not_found)

module.exports = routes
*/