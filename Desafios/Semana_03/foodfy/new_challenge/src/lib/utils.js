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
        
        /*
        {
            id: 56,
            name: 'rafael',
            photo: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            created_at: 2020-04-14T03:00:00.000Z,
            recipe_id: 19,
            recipe_name: 'Salada',
            recipe_photo: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            chef_id: 56,
            ingredients: '{"tomate","cebola","azeite","queijo branco"}',
            preparation: '{"misture tudo em uma tigeja","sirva frio"}',
            information: null,
            total: '7'
        }
        
        */

        let chefs = {}

        for (item of data){

            if(chefs[item.id]){

                const total_recipes = chefs[item.id].recipes.length

                chefs[item.id].chef_total_recipes = total_recipes

                chefs[item.id].recipes[total_recipes] = ({
                    recipe_id: item.recipe_id,
                    recipe_name: item.recipe_name,
                    recipe_ingredients: item.ingredients,
                    recipe_preparation: item.preparation,
                    recipe_information: item.information
                })
            }else {

                const tmp = {
                    chef_id: item.id,
                    chef_name: item.name,
                    chef_photo: item.photo,
                    chef_total_recipes: 1,
                    recipes:
                        {recipe_id: item.recipe_id,
                            recipe_name: item.recipe_name,
                            recipe_ingredients: item.ingredients,
                            recipe_preparation: item.preparation,
                            recipe_information: item.information
                        }
                    }
                
                chefs[item.id] = tmp

            }

        }     
            console.log(chefs)
    }
}