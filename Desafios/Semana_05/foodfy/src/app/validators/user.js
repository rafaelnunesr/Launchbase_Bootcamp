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

        const user = await User.findUser(req.body.email)
        let results = user.rows[0]

        if(!results) {
            return res.render('admin/login/index', {
                user: req.body,
                error: 'Usuário não cadastrado.'
            })
        }

        const password = results.password
        const passwordMatch = await compare(req.body.password, password)

        if(!passwordMatch){
            return res.render('admin/login/index', {
                user: req.body,
                error: 'Senha inválida!'
            })
        }

        next()
    }
}