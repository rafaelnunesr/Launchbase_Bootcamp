const db = require ('../../config/db')
const { date, groupRecipesbyChef } = require('../../lib/utils')

module.exports = {
    allChefs(params){

        const { limit, offset, callback } = params

        let query = '',
            totalQuery = `(
                SELECT count(*) FROM chefs
            ) AS total`

        query = `
        SELECT *, ${totalQuery}
        FROM chefs
        ORDER BY chefs.name LIMIT $1 OFFSET $2
    `
        
        db.query(query, [limit, offset], function(err, results){
            if(err) throw `Database error! ${err}`

            const chefs = groupRecipesbyChef(results.rows)
            callback(chefs)
        })

    },
    create(data, callback){

        const query = `
            INSERT INTO chefs(
                name,
                photo,
                created_at
            ) VALUES ($1, $2, $3)
            RETURNING id`

        
        const values = [
            data.chef_name,
            data.chef_photo,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database Erro! ${err}`

            callback(results.rows[0])
        })

    },
    find(id, callback){
        db.query(`
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            WHERE chefs.id = $1
            GROUP BY chefs.id`, [id], function(err, results){
                if (err) throw `Dababase Error! ${err}`
                
                callback(results.rows[0])
            })
    },
    delete(id, callback){

        db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err, results){
            if (err) throw `Database error! ${err}`

            return callback()
        })
    },
    allRecipes(id, callback){

        db.query(`SELECT *
                  FROM recipes
                  WHERE recipes.chef_id = $1`, [id], function(err, results){
                      if (err) throw `Database error! ${err}`
                      callback(results.rows)
                  })
    },
    paginate(params){
        const { limit, offset, callback, id } = params

        let query = '',
            totalQuery = `(
                SELECT count(*) FROM chefs
            ) AS total`,
            filterId = ''

        if (id){
            filterId = `
            WHERE chefs.id = ${id}`
        }

        query = `
        SELECT *, ${totalQuery}
        FROM chefs
        JOIN (SELECT recipes.id AS recipe_id,
                        recipes.name AS recipe_name,
                        recipes.photo AS recipe_photo,
                        recipes.chef_id,
                        recipes.ingredients,
                        recipes.preparation,
                        recipes.information
        FROM recipes
            GROUP BY recipes.id) AS Recipe
        ON chefs.id = Recipe.chef_id
        ${filterId}
        ORDER BY chefs.name LIMIT $1 OFFSET $2
    `
        
        db.query(query, [limit, offset], function(err, results){
            if(err) throw `Database error! ${err}`
            
            const chef = groupRecipesbyChef(results.rows)

            if (chef.length == 0){

                db.query(`
                    SELECT id AS chef_id,
                        name AS chef_name,
                        photo as chef_photo,
                        $1 AS chef_total_recipes
                    FROM chefs
                    WHERE id = $2`, [0, id], function(err, results){
                        if (err) throw `Dababase Error! ${err}`
                        
                        callback(results.rows)
                })
            }else {
                callback(chef)
            }
            
        })

    },
    update(data, callback){

        const query = `
            UPDATE chefs SET
                name = ($1),
                photo = ($2)
            WHERE id = $3
        `

        const values = [
            data.chef_name,
            data.chef_photo,
            data.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database error! ${err}`

            callback()
        })
    },
    paginate1(params){
        const { limit, offset, callback } = params

        let query = '',
            totalQuery = `(
                SELECT count(*) FROM chefs
            ) AS total`

        query = `
        SELECT chefs.*, ${totalQuery}, count(recipes) as total_recipes
        FROM chefs
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        GROUP BY chefs.id LIMIT $1 OFFSET $2
    `

        db.query(query, [limit, offset], function(err, results){
            if(err) throw `Database error! ${err}`

            callback(results.rows)
        })

        

    }
}