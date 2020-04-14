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

        const query = `
            INSERT INTO recipes(
                chef_id,
                photo,
                name,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id`

        const values = [
            data.chef_id,
            data.photo,
            data.name,
            data.ingredient,
            data.prep,
            data.information,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database Erro! ${err}`

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
            FROM recipes
            WHERE id = $1`, [id], function(err, results){
                if (err) throw `Dababase Error! ${err}`

                callback(results.rows[0])
            })
    }
}