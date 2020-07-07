module.exports = {
    login(req, res) {
        return res.render('admin/login/index')
    },
    post(req, res){
        return res.redirect('/admin')
    },
    list(req, res){
        return res.render('./admin/users/users')
    },
    create(req, res) {
        return res.render('./admin/users/create')
    }
}