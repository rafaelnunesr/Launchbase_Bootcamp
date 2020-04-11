const express = require('express')
const routes = express.Router()

const recipes = require('./app/controllers/recipes')
const admin = require('./app/controllers/admin')

routes.get('/', recipes.index)
routes.get('/about', recipes.about)
routes.get('/recipes', recipes.all)
routes.get('/chefs', recipes.chefs)

routes.get('/admin', admin.index)
routes.get('/admin/recipes/create', admin.create)
routes.get('/admin/recipes', admin.recipes)
routes.get('/admin/chefs', admin.chefs)
routes.get('/admin/chefs/new_chef', admin.createChef)

module.exports = routes