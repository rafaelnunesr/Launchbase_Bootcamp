const express = require('express')
const recipes = require('./controllers/recipes')
const routes = express.Router()

// Public
routes.get('/', recipes.public_index)
routes.get('/recipes', recipes.public_recipes)
routes.get('/about', recipes.public_about)

// Admin
routes.get("/admin", recipes.admin)
routes.get("/admin/index", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita
routes.post("/admin", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

routes.use(function(req, res) {
    return res.status(404).render('not-found')
})

module.exports = routes
