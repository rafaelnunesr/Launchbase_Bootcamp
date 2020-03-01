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
