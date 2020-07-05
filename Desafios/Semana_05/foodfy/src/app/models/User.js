const User = require('../models/User')
const db = require('../../config/db')

module.exports = {
    findUser(email) {
        return db.query('SELECT * FROM users WHERE email = $1', [email])
    }
}