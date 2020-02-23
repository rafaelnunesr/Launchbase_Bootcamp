const fs = require('fs')
const data = require('./data.json')
const { age, education, class_t } = require('./utils')

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