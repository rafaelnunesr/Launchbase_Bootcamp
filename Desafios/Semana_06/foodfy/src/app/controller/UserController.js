const User = require("../models/User")
const Recipe = require("../models/Recipe")
const { hash } = require('bcryptjs')

const SendEmail = require('../services/SendEmail')

module.exports = {
    async list(req, res){
        
        const ifUserIsAdmin = req.isAdmin
        const users = await User.findAll()

        return res.render('admin/users/users', { users, isAdmin: ifUserIsAdmin })
    },
    create(req, res) {
        return res.render('admin/users/create')
    },
    async post(req, res){

        const { name, email, isAdmin } = req.body

        const randomPassword = Math.round(Math.random() * 12345) ** Math.round(Math.random() * 12)

        const password = await hash(String(randomPassword), 8)
        
        const userData = {
            name,
            email,
            password,
            is_admin: isAdmin || false
        }

        await User.create(userData)

        let userPrivileges = ''

        if (userData.is_admin){

            userPrivileges = 'Você foi cadastrado como um administrador. Isso significa que você poderá criar, alterar, modificar e excluir outros usuários e chefs dentro da plataforma.'

        }else {

            userPrivileges = 'Você foi cadastrado como um usuário. Isso significa que você não poderá criar, alterar e/ou excluir outros usuários, chefs e receitas de outros usuários.'

        }

        let userEmail  = {
            user: userData.email,
            subject: 'Parabéns, você é o mais novo membro do Foodfy',
            html: `<h2>Bem vindo, ${userData.name}</h2>
            <p>Parabéns, você é o mais novo membro do Foodfy.</p>
            <p>Para acessar a sua conta, click em
                <a href='http:localhost:5000/login' target='_blank'>ACESSAR CONTA</a> em seguida, click em esqueci minha senha e você terá a oportunidade de cadastrar uma senha para a sua conta.
            </p>
            <p>${userPrivileges}</p>`
        }

        await SendEmail(userEmail)

        const message = {
            success: 'O usuário foi devidamente cadastrado e notificado por email'
        }
        return res.redirect('/admin/users')
    },
    async edit(res, req){
        return res.render(`/admin/edit/${user.id}`)

    },
    async put(req, res){

    },
    async delete(req, res){

        try{
            let id = req.body.id
            const user = await User.findUser({ where: {id} })

            id = req.session.userId
            const UserPrivilegies = await User.findUser({ where: {id} })

            if (req.body.id == req.session.userId){
                return res.render('admin/users/users', {
                    error: 'Desculpe, você não pode excluir sua conta.'
                })
            }

            if(!UserPrivilegies.is_admin){
                return res.render('admin/users/users', {
                    error: 'Desculpe, você não possui privilégios para excluir usuários'
                })
            }

            // delete recipes from user
            const recipes = await Recipe.allUserRecipes(user.id)
            const RecipeFiles = await Recipe.allUserRecipes(userId)


            // delete user
            id = req.body.id
            await User.delete(id)

            return res.render('admin/users/users', {
                success: `O usuário ${user.name} foi excluido`
            })

        }catch(err){
            console.log(err)
            return res.render('admin/index', {
                error: 'Desculpe, ocorreu um erro. Por favor tente novamente.'
            })
        }
    }
}
