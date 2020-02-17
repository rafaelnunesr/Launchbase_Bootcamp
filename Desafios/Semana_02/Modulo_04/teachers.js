const fs = require('fs')
const data = require('./data.json')

exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    
    for (key of keys) {
        if (req.body[key] == ''){
            return res.render('./not-filled')
        }
    }
    let { avatar_url, name, birth, education, class_type, lectures } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)
    education = education.split("_").join(' ')
    class_type = class_type.split('_')
    lectures = lectures.split(',')

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        education,
        class_type,
        lectures,
        created_at
    })
    
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Write file error')

        return res.render('./index')
    })

}