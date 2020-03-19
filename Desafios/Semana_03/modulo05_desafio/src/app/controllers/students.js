const { age, education, class_t, date, school } = require('../lib/utils')
const Student = require('../models/Student')


module.exports = {

    index(req, res){
        Student.all(function(students){
            return res.render('students/index', { students })
        })
    },
    create(req, res){

        Student.teacherSelectOptions(function(options){
            return res.render('students/create', {teacherOptions: options})
        })
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for (key of keys){
            if (req.body[key] == ''){
                return res.send('Please, fill all the fields!')
            }
        }

        Student.create(req.body, function(student){
            return res.redirect(`/students/${student.id}`)
        })
    },
    show(req, res){
        Student.find(req.params.id, function(student){
            if(!student) return res.send('Student not found!')

            student.birth = age(student.birth)
            student.created_at = date(student.created_at).year
            student.school_level = school(student.school_level)

            return res.render('students/show', { student })
        })
    },
    edit(req, res){
        Student.find(req.params.id, function(student){
            if(!student) return res.send('Student not found!')

            student.birth = date(student.birth).iso

            return res.render('students/edit', { student })
        })
    },
    put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ''){
                return res.send('Please fill all the fields!')
            }
        }

        Student.update(req.body, function(){
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req, res){
        Student.delete(req.body.id, function(){
            return res.redirect('/students')
        })
    }
}
