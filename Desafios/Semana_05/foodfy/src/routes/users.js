const express = require('express')
const routes = express.Router()

const ProfileController = require('../app/controller/ProfileController')
const UserController = require('../app/controller/UserController')
const UserValidator = require('../app/validators/user')

//login / logout
routes.get('/login', UserController.login)
routes.post('/login', UserValidator.post, UserController.post)

// Rotas de perfil de um usuário logado
//routes.get('/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
//routes.put('/profile', ProfileController.put)// Editar o usuário logado

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/users', UserController.list) //Mostrar a lista de usuários cadastrados
routes.get('/user/create', UserController.create)
//routes.post('/users', UserController.post) //Cadastrar um usuário
//routes.put('/users', UserController.put) // Editar um usuário
//routes.delete('/users', UserController.delete) // Deletar um usuário

module.exports = routes