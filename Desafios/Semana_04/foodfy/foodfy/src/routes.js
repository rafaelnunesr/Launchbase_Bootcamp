const express = require('express')
const routes = express.Router()

const AdminController = require('./app/controller/AdminController')

routes.get('/admin', AdminController.index)

module.exports = routes