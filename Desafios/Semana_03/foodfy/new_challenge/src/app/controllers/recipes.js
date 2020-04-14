const Chef = require('../models/Chef')
const Recipe = require('../models/Recipe')

module.exports = {
    index(req, res){
        Recipe.allRecipes(function(allRecipes){
            return res.render('recipes/index', {recipes: allRecipes})
        })
    },
    about(req, res){
        return res.render('recipes/about')
    },
    all(req, res){
        Recipe.allRecipes(function(allRecipes){
            return res.render('recipes/recipes', {recipes: allRecipes})
        })
    },
    chefs(req, res){
        Chef.allChefs(function(allChefs){
            return res.render('recipes/chefs', {chefs: allChefs})
        })
    }
}