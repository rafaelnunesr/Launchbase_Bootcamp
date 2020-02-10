const users_techs = [
    {
        nome: 'Carlos',
        tecnologias: ['HTML', 'CSS']
    },
    {
        nome: 'Jasmine',
        tecnologias: ['JavaScript', 'CSS']
    },
    {
        nome: 'Tuane',
        tecnologias: ['HTML', 'Node.js']
    }
]

function checaSeUsuarioUsaCSS (usuario) {
    
    const user_name = usuario.user_name

    for (let i = 0; i < usuario.tecnologias.length; i++){
        if (usuario.tecnologias[i] === 'CSS'){
            return true
        }
    }

    return false

}

for (let i = 0; i < users_techs.length; i++) {
    const usuarioTrabalhaComCSS = checaSeUsuarioUsaCSS(users_techs[i])
  
    if(usuarioTrabalhaComCSS) {
      console.log(`O usuário ${users_techs[i].nome} trabalha com CSS`)
    }
  }