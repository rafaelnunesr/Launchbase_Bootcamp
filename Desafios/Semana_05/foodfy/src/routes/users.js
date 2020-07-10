const express = require('express')
const routes = express.Router()

const ProfileController = require('../app/controller/ProfileController')
const UserController = require('../app/controller/UserController')
const UserValidator = require('../app/validators/user')
const SessionValidator = require('../app/validators/session')
const SessionController = require('../app/controller/SessionController')

//login / logout
routes.get('/login', SessionController.login)
routes.post('/login', SessionValidator.loginPost, SessionController.post)
routes.get('/logout', SessionController.logout)

// Rotas de perfil de um usuário logado
routes.get('/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
routes.get('/profile/:id', ProfileController.edit) // Mostrar o formulário com dados do usuário logado
routes.put('/profile', SessionValidator.editUser,ProfileController.put)// Editar o usuário logado

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/users', UserController.list) //Mostrar a lista de usuários cadastrados
routes.get('/user/create', UserController.create)
routes.post('/users', UserValidator.post, UserController.post) //Cadastrar um usuário
//routes.put('/users', UserController.put) // Editar um usuário
//routes.delete('/users', UserController.delete) // Deletar um usuário

module.exports = routes
