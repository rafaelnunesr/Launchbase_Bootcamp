const Base = require('./Base')
const db = require('../../config/db')

Base.init({ table: 'recipes' })

const Recipes = {
    ...Base,
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
            ) AS total`
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
            ORDER BY recipes.updated_at DESC
            LIMIT $1 OFFSET $2`

        return db.query(query, [limit, offset])
    }
}

module.exports = Recipes
