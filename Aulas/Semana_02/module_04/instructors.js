const fs = require('fs')
const data = require("./data.json")

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

    return res.send(foundInstructor)
}

// create
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

