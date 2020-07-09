const User = require('../models/User')
const { compare } = require('bcryptjs')

module.exports = {
    async post(req,  res, next){

        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ''){
                return res.render('admin/login/index', {
                    user: req.body,
                    error: 'Preencha todos os campos'
                })
            }
        }

        let user = await User.findUser(req.body.email)
        user = user.rows[0]

        if(!user) {
            return res.render('admin/login/index', {
                user: req.body,
                error: 'Usuário não cadastrado.'
            })
        }

        const password = user.password
        const passwordMatch = await compare(req.body.password, password)

        if(!passwordMatch){
            return res.render('admin/login/index', {
                user: req.body,
                error: 'Senha inválida!'
            })
        }

        req.user = user

        next()
    },
    ifUserLogin(req, res, next){
        const { userId: id } = req.session
        console.log(id)
        if(!id){
            return res.render('admin/login/index', {
                error: 'Faça login para acessar o conteudo.'
            })
        }

        next()
    }
}