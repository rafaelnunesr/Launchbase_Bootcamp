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

routes.get('/not-filled', function(req, res) {
    return res.render('not-filled')
})

routes.use(function(req, res) {
    return res.status(404).render('not-found')
})

module.exports = routes