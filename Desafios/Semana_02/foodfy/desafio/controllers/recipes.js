const data = require('../data.json')
const most_accessed = require('../most-accessed')
const fs = require('fs')

//Public

exports.public_index = function(req, res){
    return res.render('index', {recipes: most_accessed})
}

exports.public_recipes = function(req, res) {
    const id = req.query.id
    if (id === undefined) {
        return res.render('recipes', {recipe: data.recipes})
    }

    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id
    })

    if (!foundRecipe){
        return res.render('not-found')
    }

    const item = {
        ...foundRecipe,
    }

    return res.render('recipes', {item})
}

exports.public_about = function(req, res) {
    return res.render('about')
}



// Admin
exports.admin = function(req, res){
    return res.redirect('admin/index')
}

exports.index = function(req, res){
    return res.render('admin/index', {recipes: data.recipes})
}

exports.create = function(req, res) {
    return res.render('admin/create')
}

exports.post = function(req, res){
    
    const keys = Object.keys(req.body)

    for (key of keys){
        if (req.body[key] == '' && key != 'information'){
            return res.send('Por favor, preencha todos os campos!')
        }
    }
    
    const { author, title, image, ingredients, preparation, information} = req.body

    let id = 1
    const lastRecipe = data.recipes[data.recipes.length - 1]

    if (lastRecipe){
        id = lastRecipe.id + 1
    }

    data.recipes.push({
        id,
        author,
        title,
        image,
        ingredients,
        preparation: [
            ...req.body.preparation
        ],
        information
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err){
            return res.send("Write file error")
        }

        return res.redirect('admin')
    })

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
    const { id } = req.body

    let index = 0

    const foundRecipe = data.recipes.find(function(recipe, foundIndex){
        if (id == recipe.id){
            index = foundIndex
            return true
        }
    })

    if (!foundRecipe){
        res.send('Recipe not found!')
    }

    const rec = {
        ...foundRecipe,
        ...req.body,
        id: Number(req.body.id),
        preparation: [
            ...req.body.preparation
        ],
    }

    data.recipes[index] = rec

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err){
            res.send('Write file error!')
        }

        return res.redirect('/admin')
    })
}

exports.delete = function(req, res){
    const { id } = req.body

    const filteredRecipes = data.recipes.filter(function(recipe){
        return recipe.id != id
    })

    data.recipes = filteredRecipes

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err){
            return res.send('Write file error')
        }

        return res.redirect('/admin')
    })
}
