const Recipe = require('../models/Recipe')
const File = require('../models/File')
const RecipeFiles = require('../models/RecipeFiles')
const Chef = require('../models/Chef')
const User = require('../models/User')

async function ifUserOrChef(data) {
    const { id, name } = data.split(',')


    const chef = await Chef.findOne({ where: {id} })
    const user = await User.findOne({ where: {id} })

    if (chef.name == name){
        return 'chef'
    }else if (user == name) {
        return 'user'
    }

    return 
}

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
                recipe_path: `${req.protocol}://${req.headers.host}${recipe.file_path.replace('public', '')}`,
                recipe_id: recipe.id
            })
        })

        return res.render('admin/index', { recipes, pagination, filter, isAdmin: ifUserIsAdmin })
    },
    async create(req, res){

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
    async post(req, res){

        const keys = Object.keys(req.body)

        for (key of keys){
            if(req.body[key == '' && key != 'information']){
                return res.render('admin/recipes/create', { 
                    user: req.body, 
                    error: 'Preencha todos os campos' })
            }
        }

        /*
        if (req.files.length == 0){
            return res.render('admin/recipes/create', { 
                user: req.body, 
                error: 'Envie pelo menos uma foto' })
        }
        */
        
        const { chef_info, name, ingredients, preparation, information } = req.body
        
        const userOrChef = await ifUserOrChef(chef_info)
        let data = {}

        console.log("*********" + userOrChef)
        if (userOrChef == 'user') {
            data = {
                name,
                ingredients,
                preparation,
                information,
                user_id: Number(chef_info.split(',')[0])
            }
        }else {
            data = {
                chef_id: Number(chef_info.split(',')[0]),
                name,
                ingredients,
                preparation,
                information
            }
        }

        let results = await Recipe.create(data)
        //const recipeId = results.rows[0].id

        console.log(recipeId)

        // const filesPromise = req.files.map(file => 
        //     File.create({ 
        //         ...file, 
        //         recipe_id: recipeId 
        //     }))

        // const files = await Promise.all(filesPromise)

        // await files.map(file => {
        //     const totalPhotos = values.length

        //     for(let i = 0; i < totalPhotos; i++){
        //         const fileId = values[i].rows[0].id
        //         RecipeFiles.create(fileId, recipeId)
        //     }
        // })

        return res.send('OK')


    },
    async show(req, res) {
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
                    src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
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
    async edit(req, res){
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
    async put(req, res){
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
    async delete(req, res) {

    }
}