const express = require('express') // import express library
const nunjucks = require('nunjucks')

const server = express() // call function to server

server.set('view engine', 'njk')

server.use(express.static('public'))

nunjucks.configure('views', {
    express:server
})

server.get('/', function(req, res) {
    return res.render('about')
})

server.get('/conteudo', function(req, res) {
    return res.render('conteudo')
})

server.use(function(req, res) {
    res.status(404).render("not-found")
})

server.listen(5000, function() {
    return console.log('server is running')
})

