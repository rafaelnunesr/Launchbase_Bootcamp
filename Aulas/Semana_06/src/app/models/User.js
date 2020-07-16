const Base = require('./Base')

Base.init({ table: 'users' }) // inicializar

const User = {
    ...Base, // herda tudo que ha no Base (functions)
}

module.exports = User