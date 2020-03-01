const express = require('express')
const nunjucks = require('nunjucks')

const recipes = require('./data')
const most_accessed = require('./most-accessed')

const server = express()

server.use(express.static('public'))

server.set('view engine', 'njk')
nunjucks.configure('views', {
    express:server,
    autoescape: false,
    noCache: true
})

server.get('/', function(req, res) {
    return res.render('index', {recipes: most_accessed})
})

server.get('/recipes', function(req, res) {
    const id = req.query.id
    if (id === undefined) {
        return res.render('recipes', {recipe: recipes})
    }
    const recipe = recipes[id]
    return res.render('recipes', { item: recipe })
})

server.get('/about', function(req, res) {
    return res.render('about')
})

server.use(function(req, res) {
    return res.status(404).render('not-found')
})

server.listen(5000, function() {
    console.log('server is running')
})