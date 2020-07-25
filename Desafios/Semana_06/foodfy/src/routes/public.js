const express = require('express')
const routes = express.Router()

const PublicController = require('../app/controller/PublicController')

routes.get('/', PublicController.index)
routes.get('/about', PublicController.about)
routes.get('/recipes/:id', PublicController.showRecipe)
routes.get('/chefs/:id', PublicController.showChef)
routes.get('/chefs', PublicController.chefs)
routes.get('/recipes', PublicController.recipes)

module.exports = routes