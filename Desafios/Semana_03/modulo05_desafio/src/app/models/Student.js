const {age, date} = require('../lib/utils')
const db = require('../config/db')

module.exports = {
    all(callback){
        db.query(`SELECT * 
                  FROM students
                  ORDER BY name ASC`, function(err, results){
                      if(err) throw `Database error! ${err}` 
                      
                      callback(results.rows)
                  })
    },
    create(data, callback){
        const query = `
            INSERT INTO students(
                avatar_url,
                name,
                email,
                gender,
                birth,
                school_level,
                weekly_hours,
                about, 
                created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id`

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            data.gender,
            date(data.birth).iso,
            data.school_level,
            data.weekly_hours,
            data.about,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`SELECT *
                       FROM students
                       WHERE id = $1`, [id], function(err, results){
                           if (err) throw `Database error! ${err}`

                           callback(results.rows[0])
                       })

    },
    update(data, callback){

        const query = `UPDATE students SET
                            avatar_url = ($1),
                            name = ($2),
                            email = ($3),
                            gender = ($4),
                            birth = ($5),
                            school_level = ($6),
                            weekly_hours = ($7),
                            about = ($8)
                        WHERE id = $9`

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            data.gender,
            date(data.birth).iso,
            data.school_level,
            data.weekly_hours,
            data.about,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database error! ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM students WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            return callback()
        })
    }
}