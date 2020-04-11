module.exports = {
    index(req, res){
        return res.render('recipes/index')
    },
    about(req, res){
        return res.render('recipes/about')
    },
    all(req, res){
        return res.render('recipes/recipes')
    },
    chefs(req, res){
        return res.render('recipes/chefs')
    }
}