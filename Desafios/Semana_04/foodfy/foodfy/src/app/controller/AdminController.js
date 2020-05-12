module.exports = {
    index(req, res){
        return res.render('admin/index')
    },
    newRecipe(req, res){
        return res.render('admin/recipes/create')
    },
    newChef(req, res){
        return res.render('admin/chefs/create')
    }
}