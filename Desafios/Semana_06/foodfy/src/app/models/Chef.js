const Base = require('./Base')

Base.init({ table: 'chefs' })

const Chefs = {
    ...Base
}

module.exports = Chefs