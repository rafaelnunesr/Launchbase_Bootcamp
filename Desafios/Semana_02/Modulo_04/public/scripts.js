const body = document.querySelector('body')
const deleteButton = document.querySelector('.delete_button')
const card = document.querySelector('.card')

deleteButton.addEventListener('mouseover', function(){
    body.style.background = 'rgba(255, 0, 0, 0.4)'
    card.style.background = '#FFF'
})

deleteButton.addEventListener('mouseout', function(){
    body.style.background = '#FFF'
})