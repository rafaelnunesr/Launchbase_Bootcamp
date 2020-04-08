const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
// method to override POST and GET to PUT and DELETE
const methodOverride = require('method-override')

const server = express()

/*
A opção "extended" diz para o express qual biblioteca ele deve utilizar para fazer o parsing do conteúdo das requisições que ele recebe.
Quando extended : true vai utilizar a biblioteca qs e quando for false ele vai utilizar a biblioteca querystring.

A diferença entre elas é que a biblioteca qs permite o aninhamento de objetos (nested objects), que é praticamente como o JSON trabalha:

    {"animal":{"tipo":"cachorro","raca":"vira-lata","idade":3}}
*/
server.use(express.urlencoded( { extended: true }))

server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

nunjucks.configure('src/app/views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.set('view engine', 'njk')

server.listen(5000, function(){
    console.log('server is running')
})