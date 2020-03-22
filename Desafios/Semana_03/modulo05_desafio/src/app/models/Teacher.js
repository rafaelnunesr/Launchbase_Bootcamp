const {age, date} = require('../lib/utils')
const db = require('../config/db')

module.exports = {
    all(callback){
        db.query(`SELECT teachers.*, count(students) AS total_students 
                  FROM teachers
                  LEFT JOIN students ON (teachers.id = students.teacher_id)
                  GROUP BY teachers.id
                  ORDER BY total_students ASC`, function(err, results){
                      if(err) throw `Database error! ${err}` 
                      
                      callback(results.rows)
                  })
    },
    create(data, callback){
        const query = `
            INSERT INTO teachers(
                avatar_url,
                name,
                gender,
                birth,
                education,
                class_type,
                lectures,
                about, 
                created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id`

        const values = [
            data.avatar_url,
            data.name,
            data.gender,
            date(data.birth).iso,
            data.education,
            data.class_type,
            data.lectures,
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
                       FROM teachers
                       WHERE id = $1`, [id], function(err, results){
                           if (err) throw `Database error! ${err}`

                           callback(results.rows[0])
                       })

    },
    findBy(filter, callback){
        db.query(`SELECT teachers.*, count(students) AS total_students
                  FROM teachers
                  LEFT JOIN students ON (teachers.id = students.teacher_id)
                  WHERE teachers.name ILIKE '%${filter}'
                  OR teachers.lectures ILIKE '%${filter}'
                  GROUP BY teachers.id
                  ORDER BY total_students ASC`, function(err, results){
                      if(err) throw `Database Error! ${err}`

                      callback(results.rows)
                  })
    },
    update(data, callback){

        const query = `UPDATE teachers SET
                            avatar_url = ($1),
                            name = ($2),
                            gender = ($3),
                            birth = ($4),
                            education = ($5),
                            class_type = ($6),
                            lectures = ($7),
                            about = ($8)
                        WHERE id = $9`

        const values = [
            data.avatar_url,
            data.name,
            data.gender,
            date(data.birth).iso,
            data.education,
            data.class_type,
            data.lectures,
            data.about,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database error! ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM teachers WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            return callback()
        })
    }
}