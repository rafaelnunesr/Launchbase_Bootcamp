const express = require('express')
const routes = express.Router()

const AdminController = require('./app/controller/AdminController')

routes.get('/admin', AdminController.index)
routes.get('/admin/recipes/create', AdminController.newRecipe)

routes.get('/admin/chefs/create', AdminController.newChef)


module.exports = routes