const Chef = require('../models/Chef')
const Recipe = require('../models/Recipe')
const {list} = require('../../lib/utils')

module.exports = {
    index(req, res){
        Recipe.recipesMostAccessed(function(allRecipes){
            return res.render('recipes/index', {recipes: allRecipes})
        })
    },
    about(req, res){
        return res.render('recipes/about')
    },
    all(req, res){

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
                const pagination = {
                    total: Math.ceil(recipes[0].total / limit),
                    page
                }

                const searching_subheader = {
                    header: filter
                }

                return res.render('recipes/recipes', {recipes, filter, pagination, searching_subheader})
            }
        }
        Recipe.paginate(params)
    },
    chefs(req, res){

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

                    return res.render('recipes/chef', {chef, pageInfo, pagination})

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
                    
                    return res.render('recipes/chefs', {chefs, pageInfo, pagination})
                }
            }
            Chef.paginate(params)
        }
    },
    showRecipes(req, res){
        if(req.params.id) {

            const id = req.params.id

            Recipe.addVisitToRecipe(id, function(){
            })

            Recipe.find(id, function(recipe){

                recipe.ingredients = list(recipe.ingredients)
                recipe.preparation = list(recipe.preparation)

                if(recipe.information){
                    recipe.information = list(recipe.information)
                }

                return res.render('recipes/recipe', {recipe})
            })
            
        }
    }
}

/*
chefs(req, res){

        let { page, limit } = req.query

        page = page || 1
        limit = limit || 32
        offset = limit * (page - 1)

        const params = {
            page,
            limit,
            offset,
            callback(chefs){

                const pagination = {
                    total: Math.ceil(chefs[0].total / limit),
                    page
                }

                return res.render('recipes/chefs', {chefs, pagination})
            }
        }
        Chef.paginate(params)
    },
*/