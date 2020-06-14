  
const currentPage = location.pathname
const menuItems = document.querySelectorAll(' header .links a')

for (item of menuItems){
    if (currentPage.includes(item.getAttribute('href'))){
        item.classList.add('active')
    }
}

function paginate(selectedPage, totalPages) {
    let pages = [],
    oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++){

        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelected = currentPage <= selectedPage + 2
        const pagesBeforeSelected = currentPage >= selectedPage - 2

        if (firstAndLastPage || pagesBeforeSelected && pagesAfterSelected){
            if (oldPage && currentPage - oldPage > 2){
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
    const page = +pagination.dataset.page //+ converte para numero
    const total = +pagination.dataset.total
    const pages = paginate(page, total)

    let elements = ""

    for (let page of pages){
        if(String(page).includes('...')){
            elements += `<span>${page}</span>`
        }else {
            if (filter){
                elements += `<a href='?page=${page}&filter=${filter}'>${page}</a>`
            }else {
                elements += `<a href='?page=${page}'>${page}</a>`
            }
        }
    }

    pagination.innerHTML = elements
}

const pagination = document.querySelector('.pagination')

if (pagination) {
    createPagination(pagination)
}

const PhotosUpload = {
    input: "",
    preview: document.querySelector('.admin-recipes-photos-preview'), // div com todas as fotos do preview
    previewChef: document.querySelector('.admin-chef-photos-preview'),
    upLoadLimit: 5,
    files: [],
    AddRecipePhoto(event){
        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        if(PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file => {
            PhotosUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image() // <img>
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    addChefAvatar(event){
        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        console.log(fileList)

        if(PhotosUpload.hasChefLimit(event)) return

        Array.from(fileList).forEach(file => {
            PhotosUpload.files.push(file)

            console.log(file)
            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image() // <img>
                image.src = String(reader.result)

                const div = PhotosUpload.getChefPhotoContainer(image)

                PhotosUpload.previewChef.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    hasLimit(event){
        const { upLoadLimit, input, preview } = PhotosUpload
        const { files: fileList } = input

        if(fileList.length > upLoadLimit) {
            alert(`Envie no máximo ${upLoadLimit} fotos.`)
            event.preventDefault()
            return true
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if (item.classList && item.classList.value == "photo-box")
                photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length
        if(totalPhotos > upLoadLimit) {
            alert("Você atingiu o limite máximo de fotos")
            event.preventDefault()
            return true
        }

        return false
    },
    hasChefLimit(event){
        const chefUpLoadLimit = 1
        const { input, previewChef } = PhotosUpload
        const { files: fileList } = input

        if(fileList.length > chefUpLoadLimit) {
            alert(`Envie no máximo ${chefUpLoadLimit} fotos.`)
            event.preventDefault()
            return true
        }

        const photosDiv = []
        previewChef.childNodes.forEach(item => {
            if (item.classList && item.classList.value == "chef-avatar")
                photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length
        if(totalPhotos > chefUpLoadLimit) {
            alert("Você atingiu o limite máximo de fotos")
            event.preventDefault()
            return true
        }

        return false
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer() // Firefox || Google Chrome


        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(image) {
        const div = document.createElement('div')
        div.classList.add('photo-box')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    getChefPhotoContainer(image) {
        const div = document.createElement('div')
        div.classList.add('chef-avatar')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removeChefPhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    getRemoveButton(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },
    removePhoto(event) {
        const photoDiv = event.target.parentNode // busca o pai do elemento i, no caso a div
        const photosArray = Array.from(PhotosUpload.preview.children) // array das photos
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1) // splice remove itens de um array, 1 sao quantos elementos a serem removidos no array
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove()
    },
    removeChefPhoto(event) {
        const photoDiv = event.target.parentNode // busca o pai do elemento i, no caso a div
        const photosArray = Array.from(PhotosUpload.previewChef.children) // array das photos
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1) // splice remove itens de um array, 1 sao quantos elementos a serem removidos no array
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove()
    },
    removeOldPhoto(event) {
        const photoDiv = event.target.parentNode

        if(photoDiv.id){
            const removedFiles = document.querySelector('input[name="removed_files"]')

            if(removedFiles){
                removedFiles.value += `${photoDiv.id},`
            }
        }
        photoDiv.remove()
    }
}


const Search = {
    searchInputField(){
        const searchInputAdmin = document.querySelector('#admin-search-input')
        const addRecipeButton = document.querySelector('#addRecipe')
        const addChefButton = document.querySelector('#addChef')
        const addHideSearchButton = document.querySelector('.hide-search')
        const searchForm = document.querySelector('.admin-subheader-links form')
        const buttonSearch = document.querySelector('.button-search')

        const status = searchInputAdmin.type
        if (status == "hidden"){
            searchInputAdmin.type = "text"
            addHideSearchButton.removeAttribute('hidden')
            addRecipeButton.setAttribute('hidden', 'hidden')
            addChefButton.setAttribute('hidden', 'hidden')

        }else {
            buttonSearch.addEventListener('click', () => {
                searchForm.submit()
            })
        }
    },
    hideInputField(){
        const searchInputAdmin = document.querySelector('#admin-search-input')
        const addRecipeButton = document.querySelector('#addRecipe')
        const addChefButton = document.querySelector('#addChef')
        const addHideSearchButton = document.querySelector('.hide-search')

        const status = searchInputAdmin.type
        if (status == "text"){
            searchInputAdmin.type = "hidden"
            document.querySelector('#admin-search-input').value = ""
            addHideSearchButton.setAttribute('hidden', 'hidden')
            addRecipeButton.removeAttribute('hidden')
            addChefButton.removeAttribute('hidden')

        }

    }
}

const AddComponentRecipe = {
    addIngredient(){
        const ingredients = document.querySelectorAll('input[name="ingredients"]')
        const lastIngredient = ingredients[ingredients.length - 1].value

        if(lastIngredient == ""){
            alert("Você já possui um campo vazio para adicionar um ingrediente!")
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
            alert("Você já possui um campo vazio!")
        } else {
            const new_input = document.createElement('input')
            new_input.name = "preparation"
            new_input.placeholder = "Adicione um novo passo na preparação"
            document.querySelector('.preparation-fields').appendChild(new_input)
        }
    }


}

const ImageGallery = {
    highlight: document.querySelector('.gallery .highlight > img'), // pega a primeira imagem do hightligh
    previews: document.querySelectorAll('.gallery-preview img'),
    setImage(e){
        const { target } = e

        ImageGallery.previews.forEach(preview => preview.classList.remove('active'))
        target.classList.add('active')

        ImageGallery.highlight.src = target.src
        Lightbox.image.src = target.src // atualiza o a imagem do lightbox
    }
}

const Lightbox = {
    target: document.querySelector('.lightbox-target'),
    image: document.querySelector('.lightbox-target img'),
    closeButton: document.querySelector('.lightbox-target a.lightbox-close'),
    open(){
        Lightbox.target.style.opacity = 1
        Lightbox.target.style.top = 0
        Lightbox.target.style.bottom = 0
        Lightbox.closeButton.style.top = 0
    },
    close(){
        Lightbox.target.style.opacity = 0
        Lightbox.target.style.top = "-100%"
        Lightbox.target.style.bottom = "initial"
        Lightbox.closeButton.style.top = "-80px"
    }
}

function hide_showIngredients(){
    const ingredientsButton = document.querySelector('a.ingredients')
    const ingredients = document.querySelector('.recipe_ingredients')
    
    const status = ingredientsButton.innerHTML

    if (status === 'MOSTRAR'){
        ingredientsButton.innerText = 'ESCONDER'
        ingredients.style.display = 'block'
    } else {
        ingredientsButton.innerText = 'MOSTRAR'
        ingredients.style.display = 'none'
    }
}

function hide_showPreparation(){
    const preparationButton = document.querySelector('a.preparation')
    const preparation = document.querySelector('.recipe_preparation')
    
    const status = preparationButton.innerHTML

    if (status === 'MOSTRAR'){
        preparationButton.innerText = 'ESCONDER'
        preparation.style.display = 'block'
    } else {
        preparationButton.innerText = 'MOSTRAR'
        preparation.style.display = 'none'
    }
}

function hide_showInformation(){
    const informationButton = document.querySelector('a.information')
    const information = document.querySelector('.recipe_information')
    
    const status = informationButton.innerHTML

    if (status === 'MOSTRAR'){
        informationButton.innerText = 'ESCONDER'
        information.style.display = 'block'
    } else {
        informationButton.innerText = 'MOSTRAR'
        information.style.display = 'none'
    }
}