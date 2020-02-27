const fs = require('fs')
const data = require('./data.json')
const { age, education, class_t, date } = require('./utils')

// create
exports.post = function(req, res){
    const keys = Object.keys(req.body)

    for (key of keys){
        if (req.body[key] == ''){
            return res.send('Please, fill all the fields!')
        }
    }

    let { avatar, introduction, avatar_url, name, gender, birth, education, class_type, lectures } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        name,
        avatar_url,
        gender,
        birth,
        education,
        class_type,
        lectures,
        introduction,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write error file")
        return res.redirect('/teachers')
    })
}

// show
exports.show = function(req, res) {
    const { id } = req.params
    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if (!foundTeacher){
        return res.send('Teacher not found')
    }

    const teacher = {
        ...foundTeacher,
        birth: age(foundTeacher.birth),
        gender: '',
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at),
        education: education(foundTeacher.education),
        class_type: class_t(foundTeacher.class_type),
        lectures: foundTeacher.lectures.split(',')
    }
    
    return res.render('teachers/show', {teacher})
}

// edit
exports.edit = function(req, res){
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if (!foundTeacher){
        return res.send('Teacher not found')
    }

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return res.render('teachers/edit', { teacher })
}

exports.put = function(req, res) {
    const { id } = req.body

    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if (id == teacher.id){
            index = foundIndex
            return true
        }})

    if (!foundTeacher){
        return res.send('Teacher not found!')
    }

    const teacher_ = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.teachers[index] = teacher_

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err){
            return res.send('Write file error!')
        }

        return res.redirect(`/teachers/${id}`)
        })
}

exports.delete = function(req, res){
    const { id } = req.body

    const filteredTeacher = data.teachers.filter(function(teacher){
        return teacher.id != id
    })

    data.teachers = filteredTeacher

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Write file error!')

        return res.redirect('/teachers')
    })
}
