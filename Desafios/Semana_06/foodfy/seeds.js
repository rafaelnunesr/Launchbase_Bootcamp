const faker = require('faker')
const { hash } = require('bcryptjs')

const User = require('./src/app/models/User')
const Chef = require('./src/app/models/Chef')
const Recipe = require('./src/app/models/Recipe')
const File = require('./src/app/models/File')

let usersIds = []
let recipes = 3
let totalUsers = 10
let totalChefs = 5

async function createUsers(){
    const users = []

    const password = await hash('111', 8)

    while (users.length < totalUsers){

        let is_admin = Math.round(Math.random())

        if (is_admin){
            is_admin = true
        }else {
            is_admin = false
        }

        users.push({
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password,
            reset_token: '',
            reset_token_expires: '',
            is_admin
        })
    }

    const UsersPromise = users.map(user => User.create(user))

    usersIds = await Promise.all(UsersPromise)
}

async function init(){
    await createUsers()
}

init()