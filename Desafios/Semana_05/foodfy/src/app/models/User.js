const db = require('../../config/db')
const { hash } =  require('bcryptjs')

module.exports = {
    async findUser(filters) {
        let query = 'SELECT * FROM users'

        Object.keys(filters).map(key => {
            // WHERE | OR
            query = `${query}
                     ${key}`

            Object.keys(filters[key]).map(field => {
                query = `${query} ${field} = '${filters[key][field]}'`
            })
        })

        const results = await db.query(query)
        return results.rows[0]
    },
    async create(data) {
        try {
            const query = `
                INSERT INTO users (
                    name, 
                    email,
                    password,
                    is_admin
                ) VALUES ($1, $2, $3, $4)
                RETURNING *
            `
            const randomPassword = Math.round(Math.random() * 96848293)
            const password = await hash(String(randomPassword), 8)
            
            const values = [
                data.name,
                data.email,
                password,
                data.isAdmin || false
            ]

            const results = await db.query(query, values)
            return results.rows[0]


        }catch(err){
            console.error(err)

        }
    },
    allUsers(){
        return db.query(`
            SELECT id, name, email
            FROM users
        `)
    },
    async update(id, fields){
        let query = 'UPDATE users SET'

        Object.keys(fields).map((key, index, array) => {
            if((index + 1) < array.length) {
                query = `${query}
                        ${key} = '${fields[key]}',
                `
            }else {
                // last iteration
                query = `${query}
                        ${key} = '${fields[key]}'
                        WHERE id = ${id}
                `
            }
        })

        await db.query(query)
        return

    }
}
