const body = document.querySelector('body')
const deleteButton = document.querySelector('.delete_button')
const card = document.querySelector('.card')

if (deleteButton){

    deleteButton.addEventListener('mouseover', function(){
        body.style.background = 'rgba(255, 0, 0, 0.4)'
        card.style.background = '#FFF'
    })
    
    deleteButton.addEventListener('mouseout', function(){
        body.style.background = '#FFF'
    })
    
}

// CURRENT PAGE
const currentPage = window.location.pathname
const links = document.querySelectorAll('header .links a')

for (link of links){
    if (currentPage.includes(link.getAttribute('href'))){
        link.classList.add('active')
    }
}

// DELETE CONFIRMATION
const formDelete = document.querySelector('.form-delete')

if (formDelete){
    formDelete.addEventListener('submit', function(event){
        const confirmation = confirm('Deseja realmente excluir este cadastro?')
        if(!confirmation){
            event.preventDefault()
        }
    })
}