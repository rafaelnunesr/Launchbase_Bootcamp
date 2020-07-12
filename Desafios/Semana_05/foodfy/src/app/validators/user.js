const User = require('../models/User')

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
    }
}