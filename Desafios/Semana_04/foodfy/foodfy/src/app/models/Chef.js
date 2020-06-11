const db = require('../../config/db')

module.exports = {
    find(id){
        return db.query(`SELECT * 
                         FROM chefs
                         WHERE id = $1`, [id])
    },
    all(){
        return db.query(`SELECT * 
                         FROM chefs
                         `)
    }
}