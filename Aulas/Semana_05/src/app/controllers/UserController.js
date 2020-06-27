const User = require('../models/User')
const { formatCep, formatCpfCnpj } = require('../../lib/utils')
const user = require('../validators/user')

module.exports = {
    registerForm(req, res){
        return res.render('user/register')
    },
    async show(req, res){

        const { user } = req

        console.log(user.cpf_cnpj)
        console.log(typeof user.cpf_cnpj)
        console.log('_________________')
        user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
        console.log(user.cep)
        console.log(typeof user.cep)
        user.cep = formatCep(user.cep)

        return res.render('user/index', { user })
    },
    async post(req, res){
        
        const userId = await User.create(req.body)

        req.session.userId = userId

        return res.redirect('/users')


    },
    async update(req, res){
        try {
            let { user } = req
            let { name, email, cpf_cnpj, cep, address } = req.body

            cpf_cnpj = cpf_cnpj.replace(/\D/g, '')
            cep = cep.replace(/\D/g, '')

            await User.update(user.id, {
                name,
                email,
                cpf_cnpj,
                cep,
                address
            })

            return res.render('user/index', {
                user: req.body,
                success: 'Conta atualizada com sucesso!'
            })

        }catch(err){
            console.error(err)
            return res.render('user/index', {
                user: req.body,
                error: 'Algum erro aconteceu!'
            })
        }
    }
}