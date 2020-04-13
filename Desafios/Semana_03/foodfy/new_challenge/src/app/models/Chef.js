const db = require ('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    create(data, callback){

        const query = `
            INSERT INTO chefs(
                name,
                avatar_url,
                created_at
            ) VALUES ($1, $2, $3)
            RETURNING id`

        
        const values = [
            data.chef_name,
            data.chef_avatar,
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
                      console.log(results.rows)
                      callback(results.rows)
                  })
    }
}