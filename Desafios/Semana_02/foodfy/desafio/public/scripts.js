const recipes = document.querySelectorAll('.recipe')
const fullRecipe = document.querySelectorAll('.part')

for(let recipe of recipes) {
    recipe.addEventListener('click', function() {
        const recipeIndex = recipe.getAttribute('id')
        window.location.href = `/recipes?id=${recipeIndex - 1}`       
    })
}

for (let part of fullRecipe) {
    part.addEventListener('click', function() {
        const status = part.querySelector('a').innerHTML
        if(status === 'ESCONDER') {
            part.querySelector('a').innerText = 'MOSTRAR'
            part.querySelector('.wrapper').style.display = 'none'
        }
        else {
            part.querySelector('a').innerText = 'ESCONDER'
            part.querySelector('.wrapper').style.display = 'block'
        }
    })
}

// edit

const addNewIngredient = document.querySelector('.add-ingredient')
const addNewPreparation = document.querySelector('.add-preparation')

if (addNewIngredient){
    addNewIngredient.addEventListener('click', function(){
        const ingredient = document.querySelector('.ingredient')
        const new_input = document.createElement('input')

        new_input.placeholder = 'Ingredientes'

        ingredient.appendChild(new_input)
    })
}

if (addNewPreparation){
    addNewPreparation.addEventListener('click', function(){
        const preparation = document.querySelector('.preparation')
        const new_input = document.createElement('input')

        new_input.placeholder = 'Modo de preparo'

        preparation.appendChild(new_input)

    })
}

// delete confirmation
 const formDelete = document.querySelector('#form-delete')

 if (formDelete){
     formDelete.addEventListener('submit', function(event){
         const confirmation = confirm('Deseja realmente excluir esta receita?')

         if(!confirmation){
             event.preventDefault()
         }
     })
 }