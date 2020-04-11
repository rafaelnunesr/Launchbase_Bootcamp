module.exports = {
    index(req, res){
        return res.render('admin/index')
    },
    create(req, res){
        return res.render('admin/create')
    },
    recipes(req, res) {
        return res.render('admin/recipes')
    },
    chefs(req, res){
        return res.render('admin/chefs')
    },
    createChef(req, res){
        return res.render('admin/new_chef')
    }
}