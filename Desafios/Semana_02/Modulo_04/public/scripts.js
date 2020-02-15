const input_values = document.querySelectorAll('.item')
const last_input = document.querySelector('.lectures')
const button = document.querySelector('button')
const birth = document.getElementsByName('birth')

const save_info = document.querySelector('p')

last_input.addEventListener("change", function(){
    
    let allow_newTeacher = true

    for (let value of input_values)
    {
        if (value == undefined) {
            allow_newTeacher = false
        }
    }

    if (birth.value == "") {
        allow_newTeacher = false
    }
    
    if (allow_newTeacher){
        button.disabled = false
    }
    else {
        alert("Por gentileza, preencha todos os dados")
        save_info.style.color = "#fe5f55"
    }
})