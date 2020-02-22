const fs = require('fs')
const data = require('./data.json')

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
    return res.send(foundTeacher)
}