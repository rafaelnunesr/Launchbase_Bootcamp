module.exports = {
    date(timestamp){

        const date = new Date(timestamp)
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${ date.getUTCDate() }`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            format: `${day}/${month}/${year}`
        }
    },
    list(string){

        if(string){

            let cleanInit = string.replace('{"', '')
            let cleanEnd = cleanInit.replace('"}', '')

            let cleanString = cleanEnd.split('","')

            return cleanString
        }

        return string
        
    },
    groupRecipesbyChef(data){

        let chefs = {}

        for (item of data){

            if(chefs[item.id]){

                const recipe = {
                    recipe_id: item.recipe_id,
                    recipe_name: item.recipe_name,
                    recipe_photo: item.recipe_photo,
                    recipe_ingredients: item.ingredients,
                    recipe_preparation: item.preparation,
                    recipe_information: item.information
                }

                const total_recipes = +chefs[item.id].chef_total_recipes + 1

                chefs[item.id].chef_total_recipes = total_recipes
                chefs[item.id].recipes.push(recipe)

            }else {

                const recipe = {
                    chef_id: item.id,
                    chef_name: item.name,
                    chef_photo: item.photo,
                    chef_total_recipes: 1,
                    total: item.total,
                    recipes: [{
                        recipe_id: item.recipe_id,
                        recipe_name: item.recipe_name,
                        recipe_photo: item.recipe_photo,
                        recipe_ingredients: item.ingredients,
                        recipe_preparation: item.preparation,
                        recipe_information: item.information
                    }]
                }

                chefs[item.id] = recipe

            }

        } 
        
        const chefs_id = Object.keys(chefs)

        let chefsArray = []

        for (id of chefs_id){
            chefsArray.push(chefs[id])
        }

        return chefsArray
    }
}