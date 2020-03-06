const data = require('../data.json')

// Admin
exports.admin = function(req, res){
    return res.redirect('/admin/index')
}

exports.index = function(req, res){
    return res.render('admin/index', {recipes: data.recipes})
}

exports.create = function(req, res) {
    return res.render('admin/create')
}

exports.post = function(req, res){

    console.log(req.body)
    
    const keys = Object.keys(req.body)

    for (key of keys){
        if (req.body[key] == ''){
            return res.send('Por favor, preencha todos os campos!')
        }
    }

    return res.redirect('admin/index')
}

exports.show = function(req, res){
    const { id } = req.params

    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id
    })

    if (!foundRecipe){
        return res.render('not-found')
    }

    const recipe = {
        ...foundRecipe,
    }

    return res.render('admin/show', {recipe})
}

exports.edit = function(req, res){
    
    const { id } = req.params

    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id
    })

    if (!foundRecipe){
        return res.render('not-found')
    }

    const recipe = {
        ...foundRecipe
    }

    return res.render('admin/edit', {recipe})
}

exports.put = function(req, res){
    return res.send('ok')
}

exports.delete = function(req, res){
    return res.send('ok')
}
