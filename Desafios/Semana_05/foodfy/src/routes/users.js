const express = require('express')
const routes = express.Router()

const ProfileController = require('../app/controller/ProfileController')
const UserController = require('../app/controller/UserController')
const UserValidator = require('../app/validators/user')
const SessionValidator = require('../app/validators/session')
const SessionController = require('../app/controller/SessionController')
const { isLoggedRedirect, onlyUsers, onlyAdminUsers } =  require('../app/middlewares/session')

//login / logout
routes.get('/login', SessionController.login)
routes.post('/login', SessionValidator.loginPost, SessionController.post)
routes.get('/logout', SessionController.logout)
routes.get('/recover-password', ProfileController.recoverPassword)
routes.post('/recover-password', UserValidator.recoverPassword, ProfileController.recoverPasswordPost)
routes.get('/password-reset', SessionController.resetForm)
routes.post('/password-reset', SessionValidator.reset, SessionController.reset)

// Rotas de perfil de um usuário logado
routes.get('/profile', isLoggedRedirect, ProfileController.index) // Mostrar o formulário com dados do usuário logado
routes.get('/profile/:id', onlyUsers, ProfileController.edit) // Mostrar o formulário com dados do usuário logado
routes.put('/profile', onlyUsers, SessionValidator.editUser,ProfileController.put)// Editar o usuário logado

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/users', onlyUsers, UserController.list) //Mostrar a lista de usuários cadastrados
routes.get('/user/create', onlyUsers, onlyAdminUsers, UserController.create)
routes.post('/users', onlyUsers, onlyAdminUsers, UserValidator.post, UserController.post) //Cadastrar um usuário
routes.get('/users/:id', onlyUsers, UserValidator.edit, UserController.edit)
routes.put('/users', onlyUsers, UserValidator.put, UserController.put) // Editar um usuário
//routes.delete('/users', UserController.delete) // Deletar um usuário

module.exports = routes
