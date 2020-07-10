const User = require("../models/User")
const { put } = require("../../routes/users")

module.exports = {
    index(req, res){
        return res.render('admin/users/show', {  })
    },
    async edit(req, res){

        const user = await User.findUser(req.params.id)
        const results = user.rows[0]

        return res.render(`admin/users/edit`, { user: results, edit: true })

    },
    async put(req, res){
        return res.send('ok')
    }
}
