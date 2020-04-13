const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    create(data, callback){

        const query = `
            INSERT INTO recipes(
                chef_id,
                image,
                name,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id`

        const values = [
            data.chef_id,
            data.image,
            data.name,
            data.ingredient,
            data.preparation,
            data.information,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database Erro! ${err}`

            callback(results.rows[0])
        })

    },
    chefSelectOptions(callback){
        db.query(`SELECT name, id FROM chefs`, function(err, results){
            if (err) throw `Database error! ${err}`

            callback(results.rows)
        })
    }
}