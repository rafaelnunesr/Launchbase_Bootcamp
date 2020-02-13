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

    const keys = Object.keys() // Object e uma funcao que cria um objeto
                               // Object.keys retorna um array com todas as chaves do body

    for (key of keys)
    {
        if (req.body[key] == '') // req.body[key]  e o mesmo que req.body.name,                          //por exemplo
        {
            return res.send('Please, fill all the fields!')
        }
    }
    return res.send(req.body) // apenas para visualizarmos que foi recebido os dados
})

routes.get('/member', function(req, res) {
    return res.render('members')
})

module.exports = routes