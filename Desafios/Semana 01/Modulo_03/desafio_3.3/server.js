const express = require('express') // import express library
const nunjucks = require('nunjucks')

const server = express() // call function to server
const courses = require('./data')

server.set('view engine', 'njk')

server.use(express.static('public'))

nunjucks.configure('views', {
    express:server,
    autoescape: false,
    noCache: true
})

server.get('/', function(req, res) {
    return res.render('about')
})

server.get('/conteudo', function(req, res) {
    return res.render('conteudo', {items: courses})
})

server.get("/courses", function(req, res) {
    const id = req.query.id

    const course = courses.find(function (course) {
        return course.id == id
        
    })
    if (!course) {
        return res.send("course not found!")
    }
    
    return res.render("courses", { item: course })

})

server.use(function(req, res) {
    res.status(404).render("not-found")
})

server.listen(5000, function() {
    return console.log('server is running')
})

