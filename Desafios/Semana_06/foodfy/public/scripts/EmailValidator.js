const inputBorder = document.querySelector('input')
const allInputs = document.querySelectorAll('input')

let defaultStyle = ''
if(allInputs.length != 0){
    defaultStyle = inputBorder.style
}

const ValidateEmail = {
    apply (input, func){
        ValidateEmail.clearErrors()

        let results = ValidateEmail[func](input.value)

        input.value = results.value

        if(results.error){
            ValidateEmail.displayError(input, results.error)
            input.focus()
        }
    },
    displayError(input, error) {
        const messageError = document.createElement('div')
        messageError.classList.add('messages', 'error')
        messageError.innerHTML = error
        document.querySelector('body').appendChild(messageError)

        for (inputElement of allInputs){
            inputElement.style.border = '1px solid red'
        }
        
        input.focus()
    },
    clearErrors() {
        const errorDiv = document.querySelector('.messages.error')

        inputBorder.style.border = defaultStyle
        if(errorDiv)
            errorDiv.remove()
    },
    isEmail(value) {
        let error = null

        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(!value.match(mailFormat))
            error = 'Email inválido'

        inputBorder.style.border = defaultStyle

        return {
            error,
            value
        }
    }
}
