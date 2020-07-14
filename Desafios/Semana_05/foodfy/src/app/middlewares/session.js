const User = require('../models/User')

function onlyUsers(req, res, next){
    if(!req.session.userId){
        return res.render('admin/login/index', {
            error: 'Você precisa estar logado para acessar esta sessão.'
        })
    }

    next()
}

function isLoggedRedirect(req, res, next){
    if(req.session.userId){
        return res.redirect('/admin')
    }
}

async function onlyAdminUsers(req, res, next){
    
    const id = req.session.userId
    const user = await User.findUser({ where: { id } })

    if (!user.is_admin){
        return res.render('admin/users/users', {
            error: 'Desculpe, você não tem permissões de administrador.'
        })
    }

    next()
}

module.exports =  {
    onlyUsers,
    isLoggedRedirect,
    onlyAdminUsers
}
