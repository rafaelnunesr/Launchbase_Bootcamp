const Base = require('./Base')

Base.init({ table: 'recipes' })

const Recipes = {
    ...Base,
}

module.exports = Recipes