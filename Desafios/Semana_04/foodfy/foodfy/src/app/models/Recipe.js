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
                    SELECT recipes.id, 
                    recipes.chef_id,
                    recipes.name, 
                    chefs.name AS chef_name, 
                    MIN(recipe_files.file_id) AS file_id, 
                    MIN(files.path) AS file_path, 
                    MIN(files.name) AS file_name,
                    ${totalQuery}
            FROM recipes 
            INNER JOIN chefs ON chefs.id = recipes.chef_id
            INNER JOIN recipe_files ON recipe_files.recipe_id = recipes.id
            INNER JOIN files ON recipe_files.file_id = files.id
            ${filterQuery}
            GROUP BY recipes.id, chefs.id
            ORDER BY recipes.accessed DESC
            LIMIT $1 OFFSET $2`

        return db.query(query, [limit, offset])
    },
    recipesMostAccessed(){
        return db.query(`SELECT recipes.id,
                                recipes.chef_id,
                                recipes.name, 
                                chefs.name AS chef_name, 
                                MIN(recipe_files.file_id) AS file_id, 
                                MIN(files.path) AS file_path, 
                                MIN(files.name) AS file_name
                        FROM recipes 
                        INNER JOIN chefs ON chefs.id = recipes.chef_id
                        INNER JOIN recipe_files ON recipe_files.recipe_id = recipes.id
                        INNER JOIN files ON recipe_files.file_id = files.id
                        GROUP BY recipes.id, chefs.id
                        ORDER BY recipes.accessed DESC
                        LIMIT $1`, [6])
    },
    addVisitToRecipe(id){
        return db.query(`UPDATE recipes
                         SET accessed = accessed + 1
                         WHERE recipes.id = $1`, [id])
    }
}