const faker = require('faker')
const { hash } = require('bcryptjs')

const User = require('./src/app/models/User')
const Chef = require('./src/app/models/Chef')
const Recipe = require('./src/app/models/Recipe')
const File = require('./src/app/models/File')
const RecipeFiles = require('./src/app/models/RecipeFiles')

let usersIds = []
let chefsIds = []
let recipesIds = []
let filesIds = []
let totalRecipes = 3
let totalUsers = 10
let totalChefs = 5

async function createIngredientsPreparation(){
    const qtt = Math.floor(Math.random() * 5) + 1

    let list = ''

    for(let i = 0; i < qtt; i++){
        list += faker.name.title() + ','
    }
    return list

}

async function createUsers(){
    const users = []

    const password = await hash('111', 8)

    while (users.length < totalUsers){

        let is_admin = Math.round(Math.random())

        if (is_admin){
            is_admin = true
        }else {
            is_admin = false
        }

        users.push({
            name: faker.name.firstName() + ' ' + faker.name.lastName(),
            email: faker.internet.email().toLowerCase(),
            password,
            reset_token: '',
            reset_token_expires: '',
            is_admin
        })
    }

    const UsersPromise = users.map(user => User.create(user))

    usersIds = await Promise.all(UsersPromise)
}

async function createChefs(){
    const chefs = []

    while(chefs.length < totalChefs){
        chefs.push({
            name: faker.name.firstName() + ' ' + faker.name.lastName(),
            photo: 'public/images/chefs/defaultChef.png'
        })
    }

    const ChefsPromise = chefs.map(chef => Chef.create(chef))
    chefsIds = await Promise.all(ChefsPromise)
}

async function createRecipesForUsers(){

    if(usersIds.length == 0){
        const users = await User.findAll()

        const AllUsers = await Promise.all(users)

        for (let indexUsers = 0; indexUsers < AllUsers.length; indexUsers++){
            usersIds.push(AllUsers[indexUsers].id)
        }
    }

    for (userId of usersIds){

        const recipes = []

        while(recipes.length < Math.floor(Math.random() * totalRecipes) + 1  ){
            recipes.push({
                name: faker.name.title(),
                ingredients: await createIngredientsPreparation(),
                preparation: await createIngredientsPreparation(),
                information: faker.lorem.paragraph(Math.ceil(Math.random() * 10)),
                user_id: userId
            })
        }

        const recipesPromise = recipes.map(recipe => Recipe.create(recipe))
        recipesIds = await Promise.all(recipesPromise)
    }
}

async function createRecipesForChefs(){

    if(chefsIds.length == 0){
        const chefs = await Chef.findAll()

        const AllChefs = await Promise.all(chefs)

        for (let indexChefs = 0; indexChefs < AllChefs.length; indexChefs++){
            chefsIds.push(AllChefs[indexChefs].id)
        }
    }

    for (chefId of chefsIds){

        const recipes = []

        while(recipes.length < Math.floor(Math.random() * totalRecipes) + 1  ){
            recipes.push({
                chef_id: chefId,
                name: faker.name.title(),
                ingredients: await createIngredientsPreparation(),
                preparation: await createIngredientsPreparation(),
                information: faker.lorem.paragraph(Math.ceil(Math.random() * 10))
            })
        }

        const recipesPromise = recipes.map(recipe => Recipe.create(recipe))
        recipesIds = await Promise.all(recipesPromise)
    }
    
}

async function createFiles(){
    const files = []

    let totalRecipes = await Recipe.findAll()
    totalRecipes = totalRecipes.length

    for(let i = 0; i < totalRecipes; i++){

        for(let t = 0; t < 3; t++){
            files.push({
                name: faker.name.title(),
                path: 'public/images/recipes/defaultImageRecipe.jpg'
            })
        }
    }

    const filesPromise = files.map(file => File.create(file))
    filesIds = await Promise.all(filesPromise)
}

async function setRecipeFiles(){
    
    recipesIds = []
    filesIds = []
    
    const recipes = await Recipe.findAll()

    const allRecipes = await Promise.all(recipes)

    for (recipe of allRecipes){
        recipesIds.push(recipe.id)
    }

    const files = await File.findAll()
    const allFiles = await Promise.all(files)

    for (file of allFiles){
        filesIds.push(file.id)
    }

    let start = 0,
        end = 3

    for(recipeId of recipesIds){
        const recipeFiles = []

        const files = filesIds.slice(start, end)
        
        for (file of files){
            recipeFiles.push({
                recipe_id: recipeId,
                file_id: file
            })
        }

        const recipeFilesPromise = recipeFiles.map(recipeFile => RecipeFiles.create(recipeFile))

        await Promise.all(recipeFilesPromise)
        start = end
        end += 3
    }


}

async function init(){
    await createUsers()
    await createChefs()
    await createRecipesForUsers()
    await createRecipesForChefs()
    await createFiles()
    await setRecipeFiles()
}

init()