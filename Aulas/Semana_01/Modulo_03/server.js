const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

nunjucks.configure('views', {
    express:server,
    autoescape: false,
    noCache: true
})

server.set('view engine', 'njk')

server.get("/", function(req, res) {

    const about = {
        avatar_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8rUJBdSD4v60KBcJe605OZFl6npfnjQIoev16EMlKMKTsjxqG&s",
        name: "Lorem",
        role: "Lorem, ipsum dolor.",
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, <a href="/">dignissimos</a>.',
        links: [
            { name: 'Github', url: 'https://www.github.com'},
            { name: 'Twitter', url: 'https://www.twitter.com'},
            { name: 'Linkedin', url: 'https://wwww.linkedin.com'}

        ]
    }
    return res.render('about', { about }) // about: about ==> visto que sao identicos o nome da chave  e o nome da variavel com os dados, podemos apenas colocar o "about" sem problemas
})

server.get("/classes", function(req, res) {
    return res.render('classes', { items: videos })
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function (video) {
        return video.id == id
        
    })
    if (!video) {
        return res.send("Video not found!")
    }
    
    return res.render("video", { item: video })

})


server.listen(5000, function() {
    console.log('server is running')
})