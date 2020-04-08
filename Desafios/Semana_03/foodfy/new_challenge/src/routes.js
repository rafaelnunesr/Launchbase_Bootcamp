const express = require('express')
const routes = express.Router()

const recipes = require('./app/controllers/recipes')

routes.get('/', recipes.index)

module.exports = routes