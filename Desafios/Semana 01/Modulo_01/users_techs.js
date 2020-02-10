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

for (let i = 0; i < users_techs.length; i++){
    console.log(`${users_techs[i].nome} trabalha com ${users_techs[i].tecnologias.join(', ')}.`)
}