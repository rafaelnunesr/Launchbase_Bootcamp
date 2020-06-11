const Recipe = require('../models/Recipe')
const File = require('../models/File')
const RecipeFiles = require('../models/RecipeFiles')
const { stringToList } = require('../../lib/utils')
const Chef = require('../models/Chef')

module.exports = {
    index(req, res){

        return res.render('public/index', { showSearch: true })
    },
    about(req, res){
        return res.render('public/about')
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

        return res.render('public/show', {chef, files: filesArray, recipe})

    },
    async showChef(req, res){

        let results = await Chef.find(req.params.id)
        let chef = results.rows[0]
        
        return res.render('public/chefs/show', {chef})
    },
    async chefs(req, res){
        let results = await Chef.all()
        let chefs = results.rows

        return res.render('public/chefs/chefs', {chefs})
    },
    async recipes(req, res){
        return res.render('public/recipes/recipes', { showSearch: true })
    }
}