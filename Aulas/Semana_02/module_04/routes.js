const express = require('express')
const routes = express.Router()

routes.get('/', function(req, res) {
    return res.redirect('/instructors')
})

routes.get('/instructors', function(req, res) {
    return res.render('instructors/index')
})

routes.get('/instructors/create', function(req, res) {
    return res.render('instructors/create')
})

routes.post('/instructors', function(req, res) {
    return res.send('recebido') // apenas para visualizarmos que foi recebido os dados
})

routes.get('/member', function(req, res) {
    return res.render('members')
})

module.exports = routes