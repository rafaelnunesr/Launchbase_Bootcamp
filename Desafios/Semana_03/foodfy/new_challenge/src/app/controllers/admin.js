const Chef = require('../models/Chef')
const Recipe = require('../models/Recipe')

module.exports = {

    // RECIPES
    index(req, res){
        const pageInfo = {
            default_title: 'Gerenciar Receitas',
            first_button: {
                link: '/admin/chefs/create',
                description: 'Novo Chef'
            },
            second_button: {
                link: '/admin/recipes/create',
                description: 'Nova receita'
            }
        }

        Recipe.allRecipes(function(allRecipes){
            return res.render('admin/index', {recipes: allRecipes, pageInfo})
        })
    },
    createRecipe(req, res){

        const pageInfo = {
            default_title: 'Adicionar nova receita'
        }

        Recipe.chefSelectOptions(function(options){
            return res.render('admin/recipes/create', {chefOptions: options, pageInfo})
        })

    },
    postRecipe(req, res){
        const keys = Object.keys(req.body)

        for (key of keys){
            if (req.body[key] == '' && key != 'information')
            {
                return res.send('Please, fill all the fields')
            }
        }

        Recipe.create(req.body, function(recipe){
            return res.send(req.body)
        })
    },
    showRecipes(req, res) {
        const pageInfo = {
            default_title: 'Gerenciar Receitas',
            first_button: {
                link: '/admin/recipes/create',
                description: 'Nova receita'
            }
        }

        Recipe.allRecipes(function(allRecipes){
            return res.render('admin/index', {recipes: allRecipes, pageInfo})
        })
    },
    editRecipe(req, res){
        return res.send('edit')
    },
    putRecipe(req, res){
        return res.send('put')
    },
    deleteRecipe(req, res){
        return res.send('post')
    },

    //CHEFS
    createChef(req, res){

        const pageInfo = {
            default_title: 'Criar novo chef',
        }

        return res.render('admin/chefs/create', {pageInfo})
    },
    postChef(req, res){
        const keys = Object.keys(req.body) 

        for (key of keys) {
            if (req.body[key] == '') 
            {
                return res.send('Please, fill all the fields!')
            }
        }

        Chef.create(req.body, function(chef){
            return res.redirect('/admin/chefs')
        })
    },
    showChefs(req, res){

        if(req.params.id){
            const pageInfo = {
                default_title: '',
                first_button: {
                    link: '/admin/chefs/create',
                    description: 'Editar'
                }
            }

            Chef.find(req.params.id, function(chef){
                if (!chef) return res.send('Chef not found!')
                pageInfo.default_title = 'Chef: ' + chef.name

                return res.render('admin/chefs/chef', {chef, pageInfo})
            })
        } else {
            const pageInfo = {
                default_title: 'Gerenciar Chefs',
                first_button: {
                    link: '/admin/chefs/create',
                    description: 'Novo Chef'
                }
            }

            Chef.allChefs(function(allChefs){
                return res.render('admin/chefs/chefs', {chefs: allChefs, pageInfo})
            })
        }

    },
    editChef(req, res){
        Chef.find(req.params.id, function(chef){
            if (!chef) return res.send('Chef not found!')

            return res.render('admin/chefs/edit', { chef })
        })
    },
    putChef(req, res){
        return res.send('put')
    },
    deleteChef(req, res){

        const id = req.body.id
        let total = 0

        const total_recipes = function(){
            Chef.allRecipes(id)
        }

        if (total > 1){
            Chef.delete(id, function(){
                return res.redirect(`/admin`)
            })
        }
    }
}