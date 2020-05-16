const Recipe = require('../models/Recipe')
const File = require('../models/File')
const RecipeFiles = require('../models/RecipeFiles')


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

        const filesPromise = req.files.map(file => File.create({ ...file }))

        await Promise.all(filesPromise)
              .then((values)=>{
            const fileId = values[0].rows[0].id

            RecipeFiles.create(fileId, recipeId)
        })

        return res.send('OK')


    },
    async editRecipe(req, res){
        let results = await Recipe.find(req.params.id)
        const recipe = results.rows[0]

        if(!recipe) return res.send('Produto não encontrado!')

        results = await RecipeFiles.findRecipeInfo()
        .then((value) => {
            console.log(value)
        })

    },
    newChef(req, res){
        return res.render('admin/chefs/create')
    }
}