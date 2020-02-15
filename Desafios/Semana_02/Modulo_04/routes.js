const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get('/', function(req, res) {
    return res.render('index')
})

routes.get('/teachers', function(req, res) {
    return res.render('create')
})

routes.post('/teachers', teachers.post)

module.exports = routes