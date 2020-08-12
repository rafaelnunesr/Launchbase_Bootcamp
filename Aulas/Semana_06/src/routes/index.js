const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/HomeController')

const products = require('./products')
const users = require('./users')
const cart = require('./cart')

routes.use('/products', products)
routes.use('/users', users)
routes.use('/cart', cart)

// Home
routes.get('/', HomeController.index)

//Alias == Atalhos
routes.get('/ads/create', function(req, res){
    return res.redirect('/products/create')
})

routes.get('/accounts', function(req, res){
    return res.redirect('/users/login')
})

module.exports = routes

