const express = require('express')
const routes = express.Router()

const multer = require('../app/middlewares/multer')

const AdminController = require('../app/controller/AdminController')
const { isLoggedRedirect, onlyUsers, onlyAdminUsers, ifUserIsAdmin } =  require('../app/middlewares/session')


routes.get('/chefs/create', onlyUsers, onlyAdminUsers, AdminController.createChef)
routes.get('/recipes', onlyUsers, AdminController.index)
routes.get('/chefs', onlyUsers, ifUserIsAdmin, AdminController.chefs)
routes.post('/chefs', onlyUsers, onlyAdminUsers, multer.array('photo', 1), AdminController.chefPost)
routes.get('/chefs/:id', onlyUsers, AdminController.showChef)
routes.get('/chefs/:id/edit', onlyUsers, onlyAdminUsers, AdminController.editChef)
routes.put('/chefs', onlyUsers, onlyAdminUsers, multer.array('photo', 1), AdminController.chefPut)
routes.delete('/chefs', onlyUsers, onlyAdminUsers, AdminController.deleteChef)

module.exports = routes
