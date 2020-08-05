const express = require('express')
const routes = express.Router()

const public = require('./public')
const loginSession = require('./LoginSession')
const chefs = require('./chefs')
const recipes = require('./recipes')
const users = require('./users')

routes.use(public)

routes.use('/login', loginSession)
routes.use('/admin', users)

routes.use('/admin', chefs)
routes.use('/admin', recipes)

module.exports = routes
