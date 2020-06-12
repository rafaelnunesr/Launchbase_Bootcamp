const db = require('../../config/db')

module.exports = {
    findChef_Recipes(id){
        return db.query(`SELECT chefs.*, 
                                recipes.name AS recipe_name, 
                                recipes.id AS recipe_id, 
                                MIN(recipe_files.file_id) AS file_id, 
                                MIN(files.path) AS file_path, 
                                MIN(files.name) AS file_name
                        FROM chefs
                        INNER JOIN recipes ON recipes.chef_id = chefs.id
                        INNER JOIN recipe_files ON recipe_files.recipe_id = recipes.id
                        INNER JOIN files ON recipe_files.file_id = files.id
                        WHERE chefs.id = $1
                        GROUP BY chefs.id, recipes.id
        `, [id])
    },
    find(id){
        return db.query(`
            SELECT *
            FROM chefs
            WHERE chefs.id = $1
        `, [id])
    },
    all(){
        return db.query(`SELECT chefs.*,
                         Count(recipes) AS total_recipes
                         FROM chefs
                         LEFT OUTER JOIN recipes ON recipes.chef_id = chefs.id
                         GROUP BY chefs.id
                         ORDER BY chefs.name ASC
        `)
    }
}

/*

SELECT chefs.*, recipes.name AS recipe_name, recipes.id AS recipe_id, recipes.ingredients, recipes.preparation, recipes.information, MAX(recipe_files.file_id) AS file_id, MAX(files.path) AS file_path, MAX(files.name) AS file_name
FROM chefs
INNER JOIN recipes ON recipes.chef_id = chefs.id
INNER JOIN recipe_files ON recipe_files.recipe_id = recipes.id
INNER JOIN files ON recipe_files.file_id = files.id
WHERE chefs.id = 2
GROUP BY chefs.id, recipes.id

*/