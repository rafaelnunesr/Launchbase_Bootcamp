const Chef = require('../models/Chef')
const Recipe = require('../models/Recipe')
const {list} = require('../../lib/utils')

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
    },
    showRecipes(req, res){
        if(req.params.id) {

            Recipe.find(req.params.id, function(recipe){

                recipe.ingredients = list(recipe.ingredients)
                recipe.preparation = list(recipe.preparation)

                if(recipe.information){
                    recipe.information = list(recipe.information)
                }

                return res.render('recipes/recipe', {recipe})
            })
            
        }
    }
}