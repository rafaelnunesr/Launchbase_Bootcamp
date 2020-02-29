const fs = require('fs')
const data = require('../data.json')
const { age, education, class_t, date, school } = require('../utils')

exports.index = function(req, res){
    return res.render('students/index', {students: data.students})}

exports.create = function(req, res){
    return res.render('students/create')}

// create
exports.post = function(req, res){
    const keys = Object.keys(req.body)

    for (key of keys){
        if (req.body[key] == ''){
            return res.send('Please, fill all the fields!')
        }
    }

    birth = Date.parse(req.body.birth)
    const created_at = Date.now()
    const id = Number(data.students.length + 1)

    data.students.push({
        id,
        ...req.body,
        birth,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write error file")
        return res.redirect('/students')
    })
}

// show
exports.show = function(req, res) {
    const { id } = req.params
    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if (!foundStudent){
        return res.send('Student not found')
    }

    const student = {
        ...foundStudent,
        birth: age(foundStudent.birth),
        gender: '',
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundStudent.created_at),
        scholarship: school(foundStudent.scholarship)
    }
    
    return res.render('students/show', {student})
}

// edit
exports.edit = function(req, res){
    const { id } = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if (!foundStudent){
        return res.send('Student not found')
    }

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth),
    }

    return res.render('students/edit', { student })
}

//atualizar
exports.put = function(req, res) {
    const { id } = req.body

    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex){
        if (id == student.id){
            index = foundIndex
            return true
        }})

    if (!foundStudent){
        return res.send('Student not found!')
    }

    const student_ = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student_

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err){
            return res.send('Write file error!')
        }

        return res.redirect(`/students/${id}`)
        })
}

// delete
exports.delete = function(req, res){
    const { id } = req.body

    const filteredStudent = data.students.filter(function(student){
        return student.id != id
    })

    data.students = filteredStudent

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Write file error!')

        return res.redirect('/students')
    })
}
