const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const db = require('./db')
const { PGStore } = require('connect-pg-simple')

module.exports = session({
    store: new pgSession({
        pool: db
    }),
    secret: 'iabadabaduuuu', // secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000 // quanto tempo a sessao ficara salva no banco de dados em milisegundos
    }
})