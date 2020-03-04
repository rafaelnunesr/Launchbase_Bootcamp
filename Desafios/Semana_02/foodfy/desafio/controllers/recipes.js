const data = require('../data.json')

//index
exports.index = function(req, res){
    return res.render('index', {recipes: data.recipes})
}

exports.recipes = function(req, res){
    return res.render('recipes', {recipe: data.recipes})
}

exports.admin_index = function(req, res){
    return res.render('admin/index')
}