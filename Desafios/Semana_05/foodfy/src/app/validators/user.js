const User = require('../models/User')
const { findUser } = require('../models/User')

module.exports = {
    async post(req, res, next){

        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ''){
                return res.render('admin/users/create', {
                    user: req.body,
                    error: 'Preencha todos os campos'
                })
            }
        }

        const user = await User.findUser(req.body.email)

        if (user.rows[0]) {
            return res.render('admin/users/create', {
                user: req.body,
                error: 'Usuário já cadastrado!'
            })
        }

        next()
    }
}