const crypto = require('crypto')
const mailer = require('../../lib/mailer')
const User = require('../models/User')

module.exports = {
    loginForm(req, res){
        return res.render('session/login')
    },
    login(req, res){

        req.session.userId = req.user.id

        return res.redirect('/users')
    },
    logout(req, res) {
        req.session.destroy()
        return res.redirect('/')
    },
    forgotForm(req, res) {
        return res.render('session/forgot-password')
    },
    async forgot(req, res) {

        const user = req.user

        try {
            // um token para este usuário
            const token = crypto.randomBytes(20).toString('hex')

            // criar uma expiração para o token
            let now = new Date()
            now = now.setHours(now.getHours + 1)

            await User.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            })

            // enviar um email com recuperacao de senha
            await mailer.sendMail({
                to: user.email,
                from: 'no-reply@launchstore.com.br',
                subject: 'Recuperação de senha',
                html: `<h2>Perdeu a chave?</h2>
                    <p>Não se preocupe, click no link abaixo para recuperar sua senha.</p>
                    <p>
                        <a href='http:localhost:5000/users/password-reset?token=${token}' target='_blank'>RECUPERAR SENHA</a>
                    </p>
                ` // corpo do email
            })

            // avisar o usuário que a senha foi enviada
            return res.render('session/forgot-password', {
                success: 'Verifique seu email para resetar sua senha!'
            })

        }catch(err){
            console.error(err)
            res.render('session/forgot-password', {
                error: 'Erro inesperado! Tente novamente!'
            })
        }

        
    },
    resetForm(req, res) {
        return res.render('session/password-reset', { token: req.query.token })
    },
    reset(req, res) {
        const { email, password, passwordRepeat, token } = req.body

        try {
            // procurar o usuario

            // ver se as novas senhas sao iguais

            // verificar se o token esta correto

            // verificar se o token nao expirou

            // cria um novo hash de senha

            // atualiza o usuário 

            // avisa o usuário sobre a nova senha

        }catch(err) {
            console.error(err)
            return res.return('session/password-reset', {
                error: 'Erro inesperado. Tente novamente!'
            })
        }

    }
}