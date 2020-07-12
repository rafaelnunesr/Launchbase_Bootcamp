const User = require("../models/User")
const mailer = require('../../lib/mailer')
const { hash } = require('bcryptjs')
const crypto = require('crypto')

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
    async recoverPasswordPost(req, res){

        try {

            const user = req.user

            const token = crypto.randomBytes(20).toString('hex')

            let now = new Date()
            now = now.setHours(now.getHours + 1)

            await User.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            })
            
            await mailer.sendMail({
                to: user.email,
                from: 'no-reply@foodfy.com.br',
                subject: 'Recuperação de Senha',
                html: `<h2>Poxa ${user.name}, Esqueceu sua senha?</h2>
                    <p>Não se preocupe. Vamos te ajudar a recuperar seu acesso ao Foodfy</p>
                    <p>Para recuperar seu acesso cadastrando uma nova senha, clique neste link
                        <a href='http:localhost:5000/users/password-reset?token=${token}' target='_blank'>RECUPERAR SENHA</a> e sem seguida cadastre uma nova senha.
                    </p>
                    <p>Lembre-se que este link tem validade máxima de 1 hora.</p>
                ` // corpo do email
            })
    
            return res.render('public/index', {
                success: 'Email enviado com a recuperação da senha. Check sua caixa de entrada.'
            })

        }catch(err){
            console.error(err)
            return res.render('/', {
                error: 'Desculpe, ocorreu um erro. Por favor, tente novamente.'
            })
        }
    }
}
