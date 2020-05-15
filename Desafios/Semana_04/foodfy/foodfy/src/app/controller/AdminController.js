const Recipe = require('../models/Recipe')

module.exports = {
    index(req, res){
        return res.render('admin/index')
    },
    newRecipe(req, res){

        Recipe.chefSelectOptions()
        .then(function(results){
            const chefOptions = results.rows

            return res.render('admin/recipes/create', { chefOptions })
        }).catch(function(err){
            throw new Error(err)
        })

    },
    newChef(req, res){
        return res.render('admin/chefs/create')
    }
}