const User = require('../models/User')
const { put, edit } = require('../controller/ProfileController')

module.exports = {
    async post(req, res, next){

        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ''){
                return res.render('admin/users/create', {
                    user: req.body,
                    error: 'Preencha todos os campos'
                })
            }
        }

        const email = req.body.email
        const user = await User.findUser({ where: {email} })

        if (user) {
            return res.render('admin/users/create', {
                user: req.body,
                error: 'Usuário já cadastrado!'
            })
        }

        next()
    },
    async recoverPassword(req, res, next){

        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ''){
                return res.render('admin/users/recover-password', {
                    user: req.body,
                    error: 'Preencha o campo com o email cadastrado'
                })
            }
        }

        const email = req.body.email
        const user = await User.findUser({ where: {email} })

        if (!user) {
            return res.render('admin/users/recover-password', {
                user: req.body,
                error: 'Usuário não cadastrado!'
            })
        }

        req.user = user

        next()
    },
    async edit(req, res, next){

        const userIdLogged = req.session.userId
        const user = await User.findUser({ where: {userIdLogged} })

        try{

            if(user.id != userIdLogged || !user.is_admin){
                return res.render('/admin/users', {
                    error: 'Desculpe, você não possui privilégios para editar outros usuários.'
                })
            }

            next()

        }catch(err){
            console.error(err)
            return res.return('/admin', {
                error: 'Desculpe, ocorreu um erro. Por favor, tente novamente!'
            })
        }

    },
    async put(req, res, next){
    }
}