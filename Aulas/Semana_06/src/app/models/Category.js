const Base = require('./Base')

Base.init({ table: 'categories' })

const Categories = {
    ...Base, 
}

module.exports = Categories