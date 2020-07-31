const express = require('express')
const routes = express.Router()

// controllers
const SessionController = require('../app/controller/SessionController')
const ProfileController = require('../app/controller/ProfileController')

//validator
const SessionValidator = require('../app/validators/session')
const UserValidator = require('../app/validators/user')


//login / logout
routes.get('/', SessionController.login)
routes.post('/', SessionValidator.loginPost, SessionController.post)
//routes.get('/logout', SessionController.logout)

// password-recover / user inform its email
routes.get('/password-recover', ProfileController.recoverPassword)
routes.post('/password-recover', UserValidator.recoverPassword, ProfileController.recoverPasswordPost)

// password recover with token
//routes.get('/password-reset', SessionController.resetForm)
//routes.post('/password-reset', SessionValidator.reset, SessionController.reset)

module.exports = routes
