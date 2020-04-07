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

// PAGINATE
function paginate(selectedPage, totalPages){
    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++){
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelected = currentPage <= selectedPage + 2
        const pagesBeforeSelected = currentPage >= selectedPage - 2

        if (firstAndLastPage || pagesBeforeSelected && pagesAfterSelected){
            if(oldPage && currentPage - oldPage > 2){
                pages.push('...')
            }

            if (oldPage && currentPage - oldPage == 2){
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)

            oldPage = currentPage
        }
        
    }
    return pages
}

function createPagination(pagination){
    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)

    let elements = ""

    for(let page of pages){
        if(String(page).includes('...')){
            elements += `<span>${page}</span>`
        } else{
            if (filter){
                elements += `<a href='?page=${page}&filter=${filter}'>${page}</a>`
            }else {
                elements += `<a href='?page=${page}'> ${page}</a>`
            }
        }
    }
    pagination.innerHTML = elements
}

const pagination = document.querySelector('.pagination')

if (pagination){
    createPagination(pagination)
}