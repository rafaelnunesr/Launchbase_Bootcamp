const express = require('express')
const routes = express.Router()

// controllers
const SessionController = require('../app/controller/SessionController')
const ProfileController = require('../app/controller/ProfileController')

//validator
const SessionValidator = require('../app/validators/session')


//login / logout
routes.get('/', SessionController.login)
routes.post('/login', SessionValidator.loginPost, SessionController.post)
routes.get('/logout', SessionController.logout)

// password-recover
//routes.get('/recover-password', ProfileController.recoverPassword)
//routes.post('/recover-password', UserValidator.recoverPassword, ProfileController.recoverPasswordPost)
//routes.get('/password-reset', SessionController.resetForm)
//routes.post('/password-reset', SessionValidator.reset, SessionController.reset)

module.exports = routes
