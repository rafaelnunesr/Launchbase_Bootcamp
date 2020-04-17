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
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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
    delete(id, callback){

        db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err, results){
            if (err) throw `Database error! ${err}`

            return callback()
        })
    },
    recipeSelectOptions(callback){
        db.query(`SELECT name, id FROM chefs`, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    paginate(params){
        const { filter, limit, offset, callback } = params

        let query = '',
            filterQuery = '',
            totalQuery = `(
                SELECT count(*) FROM recipes
            ) AS total`

        if(filter) {
            filterQuery = `
                WHERE recipes.name ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM recipes
                ${filterQuery}
            ) AS total`
        }

        query = `
            SELECT *, ${totalQuery}
            FROM recipes
            JOIN (SELECT id AS chef_id,chefs.name AS chef_name
                FROM chefs) AS Chef
            ON recipes.chef_id = Chef.chef_id
            ${filterQuery}
            LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results){
            if(err) throw `Database error! ${err}`

            callback(results.rows)
        })
    }
}