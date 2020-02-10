const modalOverlay = document.querySelector('.modal-overlay')
const receitas = document.querySelectorAll('.receita')


function getRecipeAndChefName (nodeList, id_selected) {
    for (let node of nodeList) {
        const id = node.getAttribute("id")
        if (id === id_selected){
            const nameRecipe = node.querySelector('.description_receitas p')
            const nameChef = node.querySelector('.nome_chef')
            return [nameRecipe.innerText, nameChef.innerText]
        }
    }
}

for (let receita of receitas) {
    receita.addEventListener("click", function(){

        const receitaId = receita.getAttribute("id")
        const recipeInfo = getRecipeAndChefName(receitas, receitaId)
        modalOverlay.classList.add('active')

        modalOverlay.querySelector(".modal_image img").src = `./assets/${receitaId + '.png'}`
        
        modalOverlay.querySelector(".modal_description").innerText = `${recipeInfo[0]}`

        modalOverlay.querySelector(".modal_chef").innerText = `${recipeInfo[1]}`
    })
}

document.querySelector(".close-modal").addEventListener("click", function(){
    modalOverlay.classList.remove("active")
})
