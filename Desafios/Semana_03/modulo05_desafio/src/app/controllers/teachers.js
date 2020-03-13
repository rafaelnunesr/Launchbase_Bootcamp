const { age, education, class_t, date, school } = require('../lib/utils')
const Teacher = require('../models/Teacher')


module.exports = {

    index(req, res){
        Teacher.all(function(teachers){
            return res.render('teachers/index', { teachers })
        })
    },
    create(req, res){
        return res.render('teachers/create')
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for (key of keys){
            if (req.body[key] == ''){
                return res.send('Please, fill all the fields!')
            }
        }

        Teacher.create(req.body, function(teacher){
            return res.redirect(`/teachers/${teacher.id}`)
        })
    },
    show(req, res){
        Teacher.find(req.params.id, function(teacher){
            if(!teacher) return res.send('Teacher not found!')

            teacher.birth = age(teacher.birth)
            teacher.lectures = teacher.lectures.split(',')
            teacher.education = education(teacher.education)
            teacher.class_type = class_t(teacher.class_type)
            teacher.created_at = date(teacher.created_at).year

            return res.render('teachers/show', { teacher })
        })
    },
    edit(req, res){
        Teacher.find(req.params.id, function(teacher){
            if(!teacher) return res.send('Teacher not found!')

            teacher.birth = date(teacher.birth).iso

            return res.render('teachers/edit', { teacher })
        })
    },
    put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ''){
                return res.send('Please fill all the fields!')
            }
        }

        Teacher.update(req.body, function(){
            return res.redirect(`/teachers/${req.body.id}`)
        })
    },
    delete(req, res){
        Teacher.delete(req.body.id, function(){
            return res.redirect('/teachers')
        })
    }
}
