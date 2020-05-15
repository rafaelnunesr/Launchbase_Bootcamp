const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    chefSelectOptions(){
        return db.query(`SELECT name, id
                  FROM chefs
                  ORDER BY chefs.name`)
    },
    create(data){
        const query = `
            INSERT INTO recipes (
                chef_id,
                name,
                ingredients,
                preparation,
                information,
                created_at,
                accessed
            )VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
        const recipeAccessed = 0

        const values = [
            data.chef_id,
            data.name,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now().iso),
            recipeAccessed
        ]

        return db.query(query, values)
    }
}