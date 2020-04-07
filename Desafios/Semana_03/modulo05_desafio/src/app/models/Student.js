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
                teacher_id,
                created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id`

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            data.gender,
            date(data.birth).iso,
            data.scholarship,
            data.hour_week,
            data.about,
            data.teacher_id,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`SELECT students.*, teachers.name AS teacher_name
                       FROM students
                       LEFT JOIN teachers ON (students.teacher_id = teachers.id)
                       WHERE students.id = $1`, [id], function(err, results){
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
                            about = ($8),
                            teacher_id = ($9)
                        WHERE id = $10`

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            data.gender,
            date(data.birth).iso,
            data.school_level,
            data.weekly_hours,
            data.about,
            data.teacher_id,
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
    },
    teacherSelectOptions(callback){
        db.query(`SELECT name, id FROM teachers`, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    paginate(params){
        const { filter, limit, offset, callback } = params

        let query = '',
            filterQuery = '',
            totalQuery = `(
                SELECT count(*) FROM students
            ) AS total`

        if (filter){
            filterQuery = `
                WHERE students.name ILIKE '%${filter}%'
                OR students.email ILIKE '%${filter}%'`

            totalQuery = `(
                SELECT count(*) FROM students
                ${filterQuery}
            ) AS total`
        }

        query = `
            SELECT students.*, ${totalQuery}
            FROM students
            ${filterQuery}
            LIMIT $1 OFFSET $2`

        db.query(query, [limit, offset], function(err, results){
            if (err) throw `Database error! ${err}`

            callback(results.rows)
        })
    }
}