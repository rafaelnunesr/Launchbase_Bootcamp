const Chef = require('../models/Chef')
const Recipe = require('../models/Recipe')
const {list} = require('../../lib/utils')

module.exports = {

    // RECIPES
    index(req, res){

        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 10
        offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes){

                let pageInfo = {
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

                const pagination = {
                    total: Math.ceil(recipes[0].total / limit),
                    page
                }

                if(filter){
                    pageInfo = {
                        default_title: `Buscando por "${filter}"`,
                        first_button: {
                            link: '/admin/recipes/create',
                            description: 'Nova receita'
                        }
                    }
                }

                return res.render('admin/index', {recipes, pageInfo, filter, pagination})
            }
        }

        Recipe.paginate(params)
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
            return res.redirect(`/admin/recipes/${recipe.id}`)
        })
    },
    showRecipes(req, res) {

        if(req.params.id) {

            const pageInfo = {
                default_title: '',
                first_button: {
                    link: '',
                    description: 'Editar'
                }
            }

            Recipe.find(req.params.id, function(recipe){

                recipe.ingredients = list(recipe.ingredients)
                recipe.preparation = list(recipe.preparation)

                if(recipe.information){
                    recipe.information = list(recipe.information)
                }

                pageInfo.first_button.link = `/admin/recipes/${recipe.id}/edit`
                pageInfo.default_title = `Receita: ${recipe.name}`

                return res.render('admin/recipes/recipe', {recipe, pageInfo})
            })
            
        } else {

            let { filter, page, limit } = req.query

            page = page || 1
            limit = limit || 10
            offset = limit * (page - 1)

            const params = {
                filter,
                page,
                limit,
                offset,
                callback(recipes){

                    const pageInfo = {
                        default_title: 'Gerenciar Receitas',
                        first_button: {
                            link: '/admin/recipes/create',
                            description: 'Nova receita'
                        }
                    }

                    const pagination = {
                        total: Math.ceil(recipes[0].total / limit),
                        page
                    }
    
                    return res.render('admin/index', {recipes, pageInfo, filter, pagination})

                }
            }
            Recipe.paginate(params)
        }
    },
    editRecipe(req, res){
        Recipe.find(req.params.id, function(recipe){
            if (!recipe) {
                return res.send('Recipe not found!')
            }

            const recipeInfo = {
                id: recipe.id,
                chef_id: recipe.chef_id,
                photo: recipe.photo,
                name: recipe.name,
                ingredients: list(recipe.ingredients),
                preparation: list(recipe.preparation),
                information: list(recipe.information)
            }

            recipe = recipeInfo

            Recipe.recipeSelectOptions(function(options){
                return res.render('admin/recipes/edit', {recipe, chefOptions: options})
            })

        })
    },
    putRecipe(req, res){
        return res.send('put')
    },
    deleteRecipe(req, res){
        const id = req.body.id

        Recipe.delete(id, function(){
            return res.redirect(`/admin`)
        })
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

            let { page, limit } = req.query
            const id = req.params.id

            page = page || 1
            limit = limit || 6
            offset = limit * (page - 1)

            const params = {
                page,
                limit,
                offset,
                id,
                callback(Chef){

                    const pageInfo = {
                        default_title: '',
                        first_button: {
                            link: '/admin/chefs/create',
                            description: 'Editar'
                        }
                    }

                    let pagination = {}

                    if (id){

                        pagination = {
                            total: Math.ceil(Chef[0].chef_total_recipes / limit),
                            page
                        }
                    }else {
                        pagination = {
                            total: Math.ceil(Chef[0].total / limit),
                            page
                        }
                    }

                    pageInfo.default_title = 'Chef: ' + Chef[0].chef_name

                    let recipes = []

                    for (recipe of Chef[0].recipes){
                        recipes.push({
                            id: recipe.recipe_id,
                            name: recipe.recipe_name,
                            photo: recipe.recipe_photo,
                            ingredients: recipe.recipe_ingredients,
                            preparation: recipe.recipe_preparation,
                            information: recipe.recipe_information
                        })
                    }

                    let chef = {
                        name: Chef[0].chef_name,
                        photo: Chef[0].chef_photo,
                        total_recipes: Chef[0].chef_total_recipes,
                        recipes: recipes
                    }

                    return res.render('admin/chefs/chef', {chef, pageInfo, pagination})

                }
                
            }
            Chef.paginate(params)
        } else {

            let { page, limit } = req.query

            page = page || 1
            limit = limit || 32
            offset = limit * (page - 1)

            const params = {
                page,
                limit,
                offset,
                callback(chefs){

                    const pageInfo = {
                        default_title: 'Gerenciar Chefs',
                        first_button: {
                            link: '/admin/chefs/create',
                            description: 'Novo Chef'
                        }
                    }
                
                    const pagination = {
                        total: Math.ceil(chefs[0].total / limit),
                        page
                    }
                    
                    return res.render('admin/chefs/chefs', {chefs, pageInfo, pagination})
                }
            }
            Chef.paginate(params)
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


/*

NOVOOOOOOOOO

let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 9
        offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes){

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

                const pagination = {
                    total: Math.ceil(recipes[0].total / limit),
                    page
                }

                return res.render('admin/index', {recipes, pageInfo, filter, pagination})
            }
        }
*/

/*
VELHOOOO

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


*/