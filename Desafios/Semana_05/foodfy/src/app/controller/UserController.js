module.exports = {
    list(req, res){
        return res.render('./admin/users/users')
    },
    create(req, res) {
        return res.render('./admin/users/create')
    }
}