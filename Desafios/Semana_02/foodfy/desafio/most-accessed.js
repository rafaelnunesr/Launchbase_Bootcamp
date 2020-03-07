const data = require('./data.json')
let sixthiesMostAccessedRecipes = []

for (let i = 0; i < 6; i++) {
    sixthiesMostAccessedRecipes.push(data.recipes[i])
}

module.exports = sixthiesMostAccessedRecipes