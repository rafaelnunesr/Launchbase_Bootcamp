//const Chef = require('../models/Chef')

module.exports = {
    index(req, res){
        const pageInfo = {
            default_title: 'Gerenciar Receitas',
            first_button: {
                link: '/admin/chefs/new_chef',
                description: 'Novo Chef'
            },
            second_button: {
                link: '/admin/recipes/create',
                description: 'Nova receita'
            }
        }

        return res.render('admin/index', {pageInfo})
    },
    create(req, res){

        const pageInfo = {
            default_title: 'Criar nova receita',
            first_button: {
                link: '/admin/recipes',
                description: 'Salvar'
            }
        }
        return res.render('admin/create', {pageInfo})
    },
    recipes(req, res) {
        const pageInfo = {
            default_title: 'Gerenciar Receitas',
            first_button: {
                link: '/admin/recipes/create',
                description: 'Nova receita'
            }
        }

        return res.render('admin/recipes', {pageInfo})
    },
    chefs(req, res){

        const pageInfo = {
            default_title: 'Gerenciar Chefs',
            first_button: {
                link: '/admin/chefs/new_chef',
                description: 'Novo Chef'
            }
        }

        return res.render('admin/chefs', {pageInfo})
    },
    createChef(req, res){
        const pageInfo = {
            default_title: 'Criar Novo Chef',
            first_button: {
                link: '/admin/chefs',
                description: 'Salvar'
            }
        }

        return res.render('admin/new_chef', {pageInfo})
    },
    postChef(req, res){
        const keys = Object.keys(req.body)

        for (key of keys){
            if (req.body[key] == ''){
                return res.send("Please, fill all the fields!")
            }
        }

        /*
        Chefs.create(req.body, function(chef){
            return res.redirect(`/admin/chefs/${chef.id}`)
        })
        */
    }
}