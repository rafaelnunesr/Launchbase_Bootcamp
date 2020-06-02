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
            date(Date.now()).iso,
            recipeAccessed
        ]

        return db.query(query, values)
    },
    find(id){
        return db.query(`SELECT * FROM recipes WHERE id = $1`, [id])
    },
    paginate(params) {
        const { filter, limit, offset } = params

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
            )AS total`
        }

        query = `
        SELECT *, ${totalQuery}
            FROM recipes
            INNER JOIN (
            SELECT name AS chef_name, id AS chef_id
            FROM chefs) AS Chefs
            ON recipes.chef_id = Chefs.chef_id
           ${filterQuery}
           LIMIT $1 OFFSET $2
        `

        return db.query(query, [limit, offset])
    }
}