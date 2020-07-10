const User = require("../models/User")
const mailer = require('../../lib/mailer')

module.exports = {
    list(req, res){
        return res.render('./admin/users/users')
    },
    create(req, res) {
        return res.render('./admin/users/create')
    },
    async post(req, res){
        
        const user = await User.create(req.body)

        let userPrivileges  = ''

        if (user.is_admin){
            userPrivileges = 'Você foi cadastrado como um administrador. Isso significa que você poderá criar, alterar, modificar e excluir outros usuários e chefs dentro da plataforma.'
        }else {
            userPrivileges = 'Você foi cadastrado como um usuário. Isso significa que você não poderá criar, alterar e/ou excluir outros usuários, chefs e receitas de outros usuários.'
        }

        await mailer.sendMail({
            to: user.email,
            from: 'no-reply@foodfy.com.br',
            subject: 'Parabéns, você é o mais novo membro do Foodfy',
            html: `<h2>Bem vindo, ${user.name}</h2>
                <p>Parabéns, você é o mais novo membro do Foodfy.</p>
                <p>Para acessar a sua conta, click em
                    <a href='http:localhost:5000/admin' target='_blank'>ACESSAR CONTA</a> em seguida, click em esqueci minha senha e você terá a oportunidade de cadastrar uma senha para a sua conta.
                </p>
                <p>${userPrivileges}</p>
            ` // corpo do email
        })

        return res.render('./admin/index', {
            success: 'O usuário foi devidamente cadastrado e notificado por email.'
        })
    }
}