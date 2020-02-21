const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')

const server = express()

server.use(express.static('public'))
server.use(routes)

nunjucks.configure('views', {
    express:server,
    autoescape: false,
    noCache: true
})

server.set('view engine', 'njk')

server.listen(5000, function(){
    console.log('server is running')
})