const Recipe = require('../models/Recipe')
const File = require('../models/File')
const RecipeFiles = require('../models/RecipeFiles')
const { stringToList } = require('../../lib/utils')

module.exports = {
    index(req, res){
        return res.render('admin/index')
    },
    newRecipe(req, res){

        Recipe.chefSelectOptions()
        .then(function(results){
            const chefOptions = results.rows

            return res.render('admin/recipes/create', { chefOptions })
        }).catch(function(err){
            throw new Error(err)
        })

    },
    async recipePost(req, res){

        const keys = Object.keys(req.body)

        for (key of keys){
            if(req.body[key == '' || key != 'information']){
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
    async editRecipe(req, res){
        let results = await Recipe.find(req.params.id)
        let recipe = results.rows[0]

        if(!recipe) return res.send('Produto não encontrado!')

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
            if(req.body[key == '' || key != 'information'] && key != 'removed_files'){
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
    newChef(req, res){
        return res.render('admin/chefs/create')
    }
}
