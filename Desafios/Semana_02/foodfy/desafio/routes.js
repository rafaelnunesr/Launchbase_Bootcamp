const express = require('express')

const recipes = require('./data')
const most_accessed = require('./most-accessed')


const adminRecipes = require('./controllers/recipes')
const routes = express.Router()

// Public
routes.get('/', function(req, res) {
    return res.render('index', {recipes: most_accessed})
})

routes.get('/recipes', function(req, res) {
    const id = req.query.id
    if (id === undefined) {
        return res.render('recipes', {recipe: recipes})
    }
    const recipe = recipes[id]
    return res.render('recipes', { item: recipe })
})

routes.get('/about', function(req, res) {
    return res.render('about')
})

// Admin
routes.get('/admin', adminRecipes.admin)
routes.get('/admin/index', adminRecipes.index)
routes.get('/admin/recipes/:id', adminRecipes.show)
routes.get('/admin/recipes/:id/edit', adminRecipes.edit)
//routes.get("/admin/index", recipes.index); // Mostrar a lista de receitas
/*
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita
*/

routes.use(function(req, res) {
    return res.status(404).render('not-found')
})

module.exports = routes
