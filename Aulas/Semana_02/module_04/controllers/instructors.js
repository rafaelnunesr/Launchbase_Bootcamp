const fs = require('fs')
const data = require("../data.json")
const { age, date } = require('../utils')

//index
exports.index = function(req, res) {
    return res.render('instructors/index', { instructors: data.instructors })
}

exports.create = function(req, res) {
    return res.render('instructors/create')}

// post
exports.post = function (req, res) {
    const keys = Object.keys(req.body) 

    for (key of keys) {
        if (req.body[key] == '') 
        {
            return res.send('Please, fill all the fields!')
        }
    }
    
    let {avatar_url, birth, name, services, gender} = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)


    data.instructors.push({
        id,
        avatar_url,
        birth,
        created_at,
        name,
        services,
        gender
    }) 

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error")

        return res.redirect("/instructors")
    })
}

//show
exports.show = function(req, res) {
    //req.params
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foundInstructor) {
        return res.send('Instructor not found')
    }

    // corrigir os dados, como datas
    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        gender: "",
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)
    } 

    return res.render('instructors/show', {instructor})
}

//edit
exports.edit = function(req, res) {
    //req.params
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foundInstructor) {
        return res.send('Instructor not found')
    }

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso
    }

    return res.render('instructors/edit', { instructor })
}

exports.put = function(req, res) {
    const { id } = req.body // buscando dados pelo formulario
    let index = 0

    const foundInstructor = data.instructors.find(function(instructor, foundIndex){ // foundIndex == index do objeto encontrado
        if (id == instructor.id){ 
            index = foundIndex
            return true
        } 
    })

    if (!foundInstructor){
        return res.send('Instructor not found')
    }

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err){
            return res.send("Write error!")
        }
        return res.redirect(`/instructors/${id}`)
    })
}

//delete
exports.delete = function(req, res){
    const { id } = req.body

    const filteredInstructors = data.instructors.filter(function(instructor){
        return instructor.id != id // retorna somente os isntrutores diferentes, excluindo o instrutor.id que for igual ao id.
    })

    console.log(req.body.id)

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err){
            return res.send("Write file error!")
        }
        return res.redirect('/instructors')
    } )
}