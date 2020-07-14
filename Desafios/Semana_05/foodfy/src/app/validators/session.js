const User = require('../models/User')
const { compare } = require('bcryptjs')
const { findUser } = require('../models/User')

module.exports = {
    async loginPost(req,  res, next){

        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ''){
                return res.render('admin/login/index', {
                    user: req.body,
                    error: 'Preencha todos os campos'
                })
            }
        }

        const email = req.body.email
        let user = await User.findUser( {where: {email}} )

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
    },
    async editUser(req, res, next){

        try {

            const keys = Object.keys(req.body)

            for (key of keys){
                if(req.body[key] == ''){
                    return res.render('admin/users/edit', {
                        error: 'Preencha todos os campos!',
                        user: results, 
                        edit: true
                    })
                }
            }

            const id = req.session.userId
            const user = await findUser({ where: {id} })

            const checkPassword = await compare(req.body.password, user.password)

            if (!checkPassword){
                return res.render('admin/users/edit', {
                    error: 'Senha incorreta!',
                    user: user, 
                    edit: true
                })
            }

            next()

        }catch(err){
            console.error(err)
        }
    },
    async reset(req, res, next){
        const { email, password, passwordRepeat, token} = req.body

        const user = await User.findUser( { where: { email } } )

        if (!user) {
            return res.render('admin/password-reset', {
                user: req.body,
                token,
                error: 'Usuário não cadastrado'
            })
        }

        if (password != passwordRepeat) {
            return res.render('admin/password-reset', {
                user: req.body,
                token,
                error: 'As senhas não são idênticas! Escolha senhas iguais.'
            })
        }

        if ( token != user.reset_token ) {
            return res.render('admin/password-reset', {
                user: req.body,
                token,
                error: 'Token inválido. Solicite uma nova recuperacao de senha.'
            })
        }

        let now = new Date()
        now = now.setHours(now.getHours())

        if (now > Number(user.reset_token_expires)){
            return res.render('admin/password-reset', {
                user: req.body,
                token,
                error: 'Token expirado. Solicite uma nova recuperação de senha.' 
            })
        }

        req.user = user

        next()


    }
}
