const searchInputAdmin = document.querySelector('#admin-search-input')
const searchButtonAdmin = document.querySelector('.button-search')
const searchButtonIcon = document.querySelector('.button-search i')

searchButtonAdmin.addEventListener('click', function(){
    const status = searchInputAdmin.type
    if (status == "hidden"){
        searchInputAdmin.type = "text"
        searchButtonIcon.innerHTML = "keyboard_arrow_right"

    }else {
        searchInputAdmin.type = "hidden"
        searchButtonIcon.innerHTML = "search"
    }
})