const express = require('express')
const routes = express.Router()

const public = require('./public')
const loginSession = require('./LoginSession')
const admin = require('./admin')
const users = require('./users')

routes.use(public)
routes.use('/login', loginSession)
routes.use('/admin', admin)
routes.use('/admin', users)

module.exports = routes
