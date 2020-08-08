function userAccountCreated ({ name, email, is_admin }) {

    let userPrivileges = ''

        if (is_admin){

            userPrivileges = 'Você foi cadastrado como um administrador. Isso significa que você poderá criar, alterar, modificar e excluir outros usuários e chefs dentro da plataforma.'

        }else {

            userPrivileges = 'Você foi cadastrado como um usuário. Isso significa que você não poderá criar, alterar e/ou excluir outros usuários, chefs e receitas de outros usuários.'

        }

        let userEmail  = {
            user: email,
            subject: 'Parabéns, você é o mais novo membro do Foodfy',
            html: `<h2>Bem vindo, ${name}</h2>
            <p>Parabéns, você é o mais novo membro do Foodfy.</p>
            <p>Para acessar a sua conta, click em
                <a href='http:localhost:5000/login' target='_blank'>ACESSAR CONTA</a> em seguida, click em esqueci minha senha e você terá a oportunidade de cadastrar uma senha para a sua conta.
            </p>
            <p>${userPrivileges}</p>`
        }

        return userEmail
}

module.exports = {
    userAccountCreated
}