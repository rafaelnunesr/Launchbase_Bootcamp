const { hash } = require('bcryptjs')
const User =  require('../models/User')

module.exports = {
    login(req, res) {
        return res.render('admin/login/index')
    },
    post(req, res){

        req.session.userId = req.user.id

        return res.redirect('/admin/profile')
    },
    logout(req, res){
        req.session.destroy()
        return res.redirect('/')
    },
    resetForm(req, res) {
        return res.render('admin/user/password-reset')
    },
    async reset(req, res){
        const { password, token } = req.body
        const user = req.user

        try {

            // cria um novo hash de senha
            const newPassword = await hash(password, 8)

            // atualiza o usuário 
            await User.update(user.id, {
                password: newPassword,
                reset_token: '',
                reset_token_expires: ''
            })

            // avisa o usuário sobre a nova senha

            return res.render('admin/login/index', {
                user: req.body,
                success: 'Senha atualizada com sucesso.'
            })

        }catch(err){
            console.error(err)
            return res.render('admin/reset-password', {
                user: req.body,
                token,
                error: 'Erro inexperado. Por favor, tente novamente.'
            })
        }


    }
}
