const db = require('../../config/db')

module.exports = {
    create(file_id, recipe_id){
        const query = `
            INSERT INTO recipe_files (
                recipe_id,
                file_id
            ) VALUES ($1, $2)
        `

        const values = [
            recipe_id,
            file_id
        ]

        return db.query(query, values)
    },
    findFile(id){
        return db.query(`SELECT * 
                         FROM files
                        WHERE id = $1`, [id])
    },
    findRecipeInfo(recipe_id){
        return db.query(`SELECT *
                         FROM recipe_files
                         WHERE recipe_id = $1`, [recipe_id])
    }
}