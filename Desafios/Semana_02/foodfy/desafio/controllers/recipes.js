const data = require('../data.json')
const most_accessed = require('../most-accessed')

// Public
exports.index = function(req, res){
    return res.render('index', {recipes: most_accessed})
}

exports.recipes = function(req, res) {
    const id = req.query.id
    if (id === undefined) {
        return res.render('recipes', {recipe: data.recipes})
    }
    const recipe = data.recipes[id]
    return res.render('recipes', { item: recipe })
}

exports.about = function(req, res){
    return res.render('about')
}

// Admin

exports.admin = function(req, res){
    return res.render('admin/admin', {recipes: data.recipes})
}
