const data = require('../data.json')

// Admin
exports.admin = function(req, res){
    return res.redirect('/admin/index')
}

exports.index = function(req, res){
    return res.render('admin/index', {recipes: data.recipes})
}

exports.show = function(req, res){
    const { id } = req.params

    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id
    })

    if (!foundRecipe){
        return res.render('not-found')
    }

    const recipe = foundRecipe

    return res.render('admin/show', {recipe})
}
