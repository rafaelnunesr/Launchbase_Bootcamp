const currentPage = location.pathname
const links = document.querySelectorAll('.links a')

for (link of links){
    if (currentPage.includes(link.getAttribute('href'))){
        link.classList.add('active')
    }
}

// ADD NEW FIELD INGREDIENT & RECIPE STEP
const addNewIngredient = document.querySelector('.add-ingredient')
const addNewStep = document.querySelector('.add-step')

if (addNewIngredient) {
    addNewIngredient.addEventListener('click', function(){
        const ingredient = document.querySelector('.field-recipe-ingredient')

        const ingredients = document.querySelectorAll('input[name="ingredient"]')
        const lastIngredient = ingredients[ingredients.length - 1].value

        if (lastIngredient == ''){
            alert('Você já possui um campo vazio para adição de ingredientes!')
        } else{

            const new_input = document.createElement('input')

            new_input.name = 'ingredient'
        
            ingredient.appendChild(new_input)
        }

    })
}

if (addNewStep) {
    addNewStep.addEventListener('click', function(){
        const step = document.querySelector('.field-recipe-step')

        const steps = document.querySelectorAll('input[name="step"]')
        const lastStep = steps[steps.length - 1].value

        if (lastStep == ''){
            alert('Você já possui um campo vazio para adição de preparo!')
        } else {

            const new_input = document.createElement('input')

            new_input.name = 'step'
        
            step.appendChild(new_input)
        }

    })
}