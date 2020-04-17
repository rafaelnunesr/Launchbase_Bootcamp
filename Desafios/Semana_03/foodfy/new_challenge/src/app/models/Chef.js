const db = require ('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    allChefs(callback){
        db.query(`SELECT *
                  FROM chefs
                  ORDER BY chefs.name`, function(err, results){
                      if (err) throw `Database error! ${err}`

                      callback(results.rows)
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
            SELECT *
            FROM chefs
            WHERE id = $1`, [id], function(err, results){
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