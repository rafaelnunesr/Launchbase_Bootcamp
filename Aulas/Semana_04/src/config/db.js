const { Pool } = require('pg') // O metodo "Pool" é uma forma de evitarmos que todas as vezes que passarmos dados para o nosos banco de dados, ou mesmo consultar estes dados, tenhamos que enviar nosos login e senha para o banco de dados saber que temos a permissão de acessar e alterar os dados do banco de dados.

module.exports = new Pool({
    user: '', //username
    password: '',
    host: 'localhost',
    port: 5432, //porta padrão do postgres,
    database: 'launchstoredb'
})

// >>> pg_ctl -D /usr/local/var/postgres start