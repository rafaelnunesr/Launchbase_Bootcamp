const PhotosUpload = {
    input: "",
    preview: document.querySelector('.admin-recipes-photos-preview'), // div com todas as fotos do preview
    upLoadLimit: 5,
    files: [],
    handleFileInput(event){
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
            if (item.classList && item.classList.value == "photo")
                photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length
        if(totalPhotos > uploadLimit) {
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
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

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
        const searchButtonIcon = document.querySelector('.button-search i')

        const status = searchInputAdmin.type
        if (status == "hidden"){
            searchInputAdmin.type = "text"
            searchButtonIcon.innerHTML = "keyboard_arrow_right"

        }else {
            searchInputAdmin.type = "hidden"
            searchButtonIcon.innerHTML = "search"
            document.querySelector('#admin-search-input').value = ""
        }
    }
}

const AddComponentRecipe = {
    addIngredient(){
        const ingredients = document.querySelectorAll('input[name="ingredient"]')
        const lastIngredient = ingredients[ingredients.length - 1].value

        if(lastIngredient == ""){
            alert("Você já possui um campo vazio para adicionar um ingrediente!")
        } else {
            const new_input = document.createElement('input')
            new_input.name = "ingredient"
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