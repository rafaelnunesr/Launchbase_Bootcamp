const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    allRecipes(callback){
        db.query(`SELECT *
                  FROM recipes as Recipe
                  JOIN (SELECT id AS chef_id,chefs.name AS chef_name
                        FROM chefs) AS Chef
                  ON Recipe.chef_id = Chef.chef_id
                  ORDER BY Recipe.name`, function(err, results){
                      if (err) throw `Database error! ${err}`

                      callback(results.rows)
                  })

    },
    create(data, callback){

        const recipeAccessed = 0
        
        const query = `
            INSERT INTO recipes(
                chef_id,
                photo,
                name,
                ingredients,
                preparation,
                information,
                created_at,
                accessed
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, %8)
            RETURNING id`

        const values = [
            data.chef_id,
            data.photo,
            data.name,
            data.ingredient,
            data.prep,
            data.information,
            date(Date.now()).iso,
            recipeAccessed
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })

    },
    chefSelectOptions(callback){
        db.query(`SELECT name, id 
                  FROM chefs
                  ORDER BY chefs.name`, function(err, results){
            if (err) throw `Database error! ${err}`

            callback(results.rows)
        })
    },
    find(id, callback){
        db.query(`
            SELECT *
            FROM recipes as Recipe
            JOIN (SELECT id AS chef_id,chefs.name AS chef_name
                FROM chefs) AS Chef
            ON Recipe.chef_id = Chef.chef_id
            WHERE id = $1`, [id], function(err, results){
                if (err) throw `Dababase Error! ${err}`

                callback(results.rows[0])
            })
    },
    recipesMostAccessed(callback){
        db.query(`SELECT *
                    FROM recipes as Recipe
                    JOIN (SELECT id AS chef_id,chefs.name AS chef_name
                        FROM chefs) AS Chef
                    ON Recipe.chef_id = Chef.chef_id
                    ORDER BY Recipe.accessed DESC
                    LIMIT $1`, [6], function(err, results){
                        if (err) throw `Database error! ${err}`

                        callback(results.rows)
                    })

    },
    addVisitToRecipe(id, callback){
        db.query(`UPDATE recipes
                  SET accessed = accessed + 1
                  WHERE recipes.id = $1`, [id], function(err, results){
                      if (err) throw `Database Error! ${err}`
                      callback()
                  })
    },
    findBy(filter, callback){
        db.query(`SELECT *
                  FROM recipes as Recipe
                  JOIN (SELECT id AS chef_id,chefs.name AS chef_name
                      FROM chefs) AS Chef
                  ON Recipe.chef_id = Chef.chef_id
                  WHERE recipe.name ILIKE '%${filter}'
                  ORDER BY Recipe.name`, function(err, results){
                      if(err) throw `Database Error! ${err}`

                      callback(results.rows)
                  })
    }
}