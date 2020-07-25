const express = require('express')
const routes = express.Router()

const public = require('./public')
const admin = require('./admin')
const users = require('./users')

routes.use(public)
routes.use('/admin', admin)
routes.use('/admin', users)

module.exports = routes