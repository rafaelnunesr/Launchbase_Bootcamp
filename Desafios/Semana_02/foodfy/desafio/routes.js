const express = require('express')
const recipes = require('./controllers/recipes')
const routes = express.Router()

// Public
routes.get('/', recipes.index)
routes.get('/recipes', recipes.recipes)
routes.get('/about', recipes.about)

// Admin
routes.get('/admin', recipes.admin)
//routes.get("/admin/index", recipes.index); // Mostrar a lista de receitas
/*
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita
*/
module.exports = routes
