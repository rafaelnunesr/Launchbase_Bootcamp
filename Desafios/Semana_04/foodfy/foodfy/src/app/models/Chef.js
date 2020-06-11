const db = require('../../config/db')

module.exports = {
    find(id){
        return db.query(`SELECT * 
                         FROM chefs
                         WHERE id = $1`, [id])
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