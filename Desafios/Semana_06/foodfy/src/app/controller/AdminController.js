const Recipe = require('../models/Recipe')
const File = require('../models/File')
const RecipeFiles = require('../models/RecipeFiles')
const { stringToList } = require('../../lib/utils')
const Chef = require('../models/Chef')
const User = require('../models/User')
const fs = require('fs')

module.exports = {
    async index(req, res){
        const ifUserIsAdmin = req.isAdmin

        let { page, limit, filter } = req.query

        page = page || 1
        limit = limit || 8
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
            return res.render('admin/index', { recipes, filter, isAdmin: ifUserIsAdmin})
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

        return res.render('admin/index', { recipes, pagination, filter, isAdmin: ifUserIsAdmin })
    },
    async createRecipe(req, res){

        try {
            const userLogged = req.session.userId
            const ifUserIsAdmin = req.isAdmin
            let chefsUsersOptions = []

            if(ifUserIsAdmin){
                const chefList = await Chef.findAll()
                const userList = await User.findAll()
                const chefOptions  = [{id: 0, name: '---CHEFS---'}]
                const userOptions = [{id: 0, name: '---USERS---'}]

                for(chef of chefList){
                    chefOptions.push(chef)
                }

                for(user of userList){
                    userOptions.push(user)
                }

                chefsUsersOptions = chefOptions.concat(userOptions)
            }
            else {
                const user = await User.findOne({ where: {id: userLogged} })
                chefsUsersOptions.push(user)
            }

            return res.render('admin/recipes/create', { chefsUsersOptions, userLogged })
        } catch (error) {
            console.error(error)
        }

    },
    async recipePost(req, res){

        const keys = Object.keys(req.body)

        for (key of keys){
            if(req.body[key == '' && key != 'information']){
                return res.send('Por favor, preencha todos os campos')
            }
        }

        if (req.files.length == 0){
            return res.send('Por favor, envie pelo menos uma foto da receita.')
        }

        let results = await Recipe.create(req.body)
        const recipeId = results.rows[0].id

        const filesPromise = req.files.map(file => File.create({ ...file, recipe_id: recipeId }))

        await Promise.all(filesPromise)
              .then((values)=>{
                const totalPhotos = values.length
                for(let i = 0; i < totalPhotos; i++){

                    const fileId = values[i].rows[0].id

                    RecipeFiles.create(fileId, recipeId)
                }
                
        })

        return res.send('OK')


    },
    async showRecipe(req, res) {
        let results = await Recipe.find(req.params.id)
        let recipe = results.rows[0]

        if(!recipe) return res.send('Receita não encontrada.')

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
            return value.rows[0].name
        })

        recipe = {
            ...recipe,
            ingredients: stringToList(recipe.ingredients),
            preparation: stringToList(recipe.preparation)
        }

        return res.render('admin/recipes/show', {chef, files: filesArray, recipe})


    },
    async editRecipe(req, res){
        let results = await Recipe.find(req.params.id)
        let recipe = results.rows[0]

        if(!recipe) return res.send('Receita não encontrada!')

        const filesId = await RecipeFiles.findRecipeInfo(recipe.id).then((value) => {
            
            return value.rows
        })

        let filesArray = []

        for (let i = 0; i < filesId.length; i++){
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

        const chefOptions = await Recipe.chefSelectOptions(recipe.chef_id).then((value) => {
            return value.rows
        })

        recipe = {
            ...recipe,
            ingredients: stringToList(recipe.ingredients),
            preparation: stringToList(recipe.preparation)
        }

        return res.render('admin/recipes/edit', { chefOptions, files: filesArray, recipe })

    },
    async RecipePut(req, res){
        const keys = Object.keys(req.body)

        for (key of keys){
            if(req.body[key] == '' && key != 'information' && key != 'removed_files' ){
                return res.send('Por favor, preencha todos os campos')
            }
        }
        
        if (req.files.length == 0){
            return res.send('Por favor, envie pelo menos uma foto da receita.')
        }

        const newFilesPromise = req.files.map(file => File.create({...file, recipe_id: req.body.id}))

        await Promise.all(newFilesPromise)

        if(req.body.removed_files){
            const removedFiles = req.body.removed_files.split(',')
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1)

            const removedFilesPromise =  removedFiles.map(id => File.delete(id))

            await Promise.all(removedFilesPromise)
        }

        return res.redirect(`/admin/recipes/${req.body.id}`)
    },
    createChef(req, res){
        return res.render('admin/chefs/create')
    },
    async chefs(req, res){

        const ifUserIsAdmin = req.isAdmin

        const allChefs = await Chef.findAll()
        const chefs = []
        
       for (chef of allChefs){
           const recipes = await Recipe.findAll({ where: { chef_id: chef.id } })
           chefs.push({
                ...chef,
                photo: `${req.protocol}://${req.headers.host}${chef.photo.replace('public', "")}`,
                total_recipes: recipes.length
           })
       }

        return res.render('admin/chefs/chefs', {chefs, isAdmin: ifUserIsAdmin})
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
            photo: `${req.protocol}://${req.headers.host}${chef[0].photo.replace("public", "")}`,
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

        return res.render('admin/chefs/show', {chef: chef_info})
    },
    async editChef(req, res){

        let results = await Chef.find(req.params.id)
        let chef = results.rows[0]

        if(!chef) return res.send('Chef não encontrado!')

        chef = {
            ...chef,
            src: `${req.protocol}://${req.headers.host}${chef.photo.replace('public', "")}`
        }

        return res.render('admin/chefs/edit', { chef })
    },
    async chefPost(req, res){

        const keys = Object.keys(req.body)

        for (key of keys){
            if(req.body[key == '']){
                return res.send('Por favor, preencha todos os campos')
            }
        }

        if (req.files.length == 0){
            return res.send('Por favor, envie uma foto do chef.')
        }

        const data = {
            name: req.body.name,
            photo: req.files[0].path
        }

        let results = await Chef.create(data)
        const chefId = results.rows[0].id

        return res.redirect(`/admin/chefs/${chefId}`)

    },
    async deleteChef(req, res){

        const id = req.body.id

        const totalRecipes = await Chef.findChef_Recipes(id)
        if (totalRecipes.rows.length > 0){
            return res.send('Infelizmente, este chef não pode ser deletado no momento, pois ele possui receitas. Apague todas as receitas deste chef primeiro, para depois excluí-lo.')
        }

        let file = await Chef.find(id)
        file = file.rows[0].photo
        
        fs.unlinkSync(file)

        await Chef.delete(id)

        return res.redirect('/admin/chefs')


    },
    async deleteRecipe(req, res){
        const id = req.body.id

    },
    async chefPut(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == '' && key != 'removed_files'){
                return res.send('Por favor, preencha todos os campos.')
            }
        }

        if (req.files.length == 0){
            return res.send('Por favor, envie pelo menos uma foto do chef.')
        }

        const data = {
            name: req.body.name,
            photo: req.files[0].path,
            id: req.body.id
        }

        await Chef.update(data)

        return res.redirect(`/admin/chefs/${req.body.id}`)
    }
}
