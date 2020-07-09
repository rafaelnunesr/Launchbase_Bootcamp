module.exports = {
    login(req, res) {
        return res.render('admin/login/index')
    },
    post(req, res){

        req.session.userId = req.user.id

        return res.redirect('/admin')
    },
    logout(req, res){
        req.session.destroy()
        return res.redirect('/')
    }
}