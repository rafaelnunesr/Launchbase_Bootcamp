const faker = require('faker')
const { hash } = require('bcryptjs')

const User = require('./src/app/models/User')
const Chef = require('./src/app/models/Chef')
const Recipe = require('./src/app/models/Recipe')
const File = require('./src/app/models/File')