const User = require("../models/User")
const { put } = require("../../routes/users")

module.exports = {
    async index(req, res){

        const { userId: id } = req.session
        const user = await User.findUser({ where: {id} })

        return res.render('admin/users/show', { edit: true, user })
    },
    async edit(req, res){

        const { id } = req.params
        const user = await User.findUser({ where: {id} })

        return res.render(`admin/users/edit`, { user, edit: true })

    },
    async put(req, res){
        return res.send('ok')
    },
    recoverPassword(req, res){
        return res.render('admin/users/recover-password')
    },
    recoverPasswordPost(req, res){
        return res.render('/', {
            success: 'Email enviado com a recuperação da senha. Check sua caixa de entrada.'
        })
    }
}
