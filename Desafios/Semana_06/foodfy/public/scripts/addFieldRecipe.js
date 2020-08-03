function displayError(error) {
    const messageError = document.createElement('div')
    messageError.classList.add('messages', 'error')
    messageError.innerHTML = error
    document.querySelector('body').appendChild(messageError)
    
}

async function clearErrors() {
    const errorDiv = document.querySelector('.messages.error')
    await new Promise(r => setTimeout(r, 2000))
    if(errorDiv)
        errorDiv.remove()
}

const AddComponentRecipe = {
    addIngredient(){
        const ingredients = document.querySelectorAll('input[name="ingredients"]')
        const lastIngredient = ingredients[ingredients.length - 1].value

        if(lastIngredient == ""){
            displayError("Você já possui um campo vazio para adicionar um ingrediente!")
            clearErrors()
        } else {
            const new_input = document.createElement('input')
            new_input.name = "ingredients"
            new_input.placeholder = "Adicione um novo ingrediente"
            document.querySelector('.ingredients-fields').appendChild(new_input)
        }
    },
    addPreparation(){
        const preparation = document.querySelectorAll('input[name="preparation"]')
        const lastPreparation = preparation[preparation.length - 1].value

        if(lastPreparation == ""){
            displayError("Você já possui um campo vazio!")
            clearErrors()
        } else {
            const new_input = document.createElement('input')
            new_input.name = "preparation"
            new_input.placeholder = "Adicione um novo passo na preparação"
            document.querySelector('.preparation-fields').appendChild(new_input)
        }
    }


}