const data = require('./data')
let sixthiesMostAccessedRecipes = []

for (let i = 0; i < 6; i++) {
    sixthiesMostAccessedRecipes.push(data.recipes[i])
}

module.exports = sixthiesMostAccessedRecipes
