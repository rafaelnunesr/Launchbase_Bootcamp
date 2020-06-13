const Recipe = require('../models/Recipe')
const File = require('../models/File')
const RecipeFiles = require('../models/RecipeFiles')
const { stringToList } = require('../../lib/utils')
const Chef = require('../models/Chef')

module.exports = {
    async index(req, res){

        let results = await Recipe.recipesMostAccessed()
        results = results.rows

        let recipes = []

        results.map(recipe => {
            recipes.push({
                ...recipe,
                recipe_name: recipe.name,
                recipe_id: recipe.id,
                recipe_path: `${req.protocol}://${req.headers.host}${recipe.file_path.replace("public", "")}`
            })
        })

        return res.render('public/index', {recipes, showSearch: true})
    },
    about(req, res){
        return res.render('public/about')
    },
    async showRecipe(req, res) {
        let results = await Recipe.find(req.params.id)
        let recipe = results.rows[0]

        if(!recipe) return res.send('Receita não encontrada.')

        await Recipe.addVisitToRecipe(recipe.id)

        const filesId = await RecipeFiles.findRecipeInfo(recipe.id).then((value) => {
            return value.rows
        })

        let filesArray = []

        for(let i = 0; i < filesId.length; i++){
            let files = ""
            const file = await RecipeFiles.findFile(filesId[i].file_id).then((value) => {
                files = value.rows
                files = files.map(file => ({
                    ...file,
                    src: `${req.protocol}://${req.headers.host}${file.path.replace('public', "")}`
                }))
            })
            filesArray.push(files[0])
        }

        const chef = await Chef.find(recipe.chef_id).then((value) => {
            return {
                chef_name: value.rows[0].name, 
                chef_id: value.rows[0].id
            }
        })

        recipe = {
            ...recipe,
            ingredients: stringToList(recipe.ingredients),
            preparation: stringToList(recipe.preparation)
        }

        return res.render('public/show', {chef, files: filesArray, recipe})

    },
    async showChef(req, res){

        let results = await Chef.findChef_Recipes(req.params.id)
        let chef = results.rows
        let total_recipes = 0

        if (chef.length == 0){
            results = await Chef.find(req.params.id)
            chef = results.rows
        }

        let chef_info = {
            id: chef[0].id,
            _name: chef[0].name,
            photo: chef[0].photo,
            recipes: []
        }

        if (chef[0].recipe_id)
            chef.map(rec => {
                chef_info.recipes.push({
                    recipe_id: rec.recipe_id,
                    recipe_name: rec.recipe_name,
                    recipe_path: `${req.protocol}://${req.headers.host}${rec.file_path.replace("public", "")}`
                })
                total_recipes++
            })

        chef_info.total_recipes = total_recipes

        return res.render('public/chefs/show', {chef: chef_info})
    },
    async chefs(req, res){
        let results = await Chef.all()
        let chefs = results.rows

        return res.render('public/chefs/chefs', {chefs})
    },
    async recipes(req, res){

        let { page, limit, filter } = req.query

        page = page || 1
        limit = limit || 12
        offset = limit * (page - 1)

        const params = {
            filter,
            limit,
            offset
        }

        let results = await Recipe.paginate(params)
        results = results.rows

        let recipes = []

        if(results.length == 0){
            return res.render('public/recipes/recipes', { recipes, showSearch: true, filter})
        }

        pagination = {
            total: Math.ceil(results[0].total / limit),
            page}

        results.map(recipe => {
            recipes.push({
                ...recipe,
                recipe_name: recipe.name,
                recipe_path: `${req.protocol}://${req.headers.host}${recipe.file_path.replace("public", "")}`,
                recipe_id: recipe.id
            })
        })

        return res.render('public/recipes/recipes', { recipes, showSearch: true, pagination, filter })
    }
}