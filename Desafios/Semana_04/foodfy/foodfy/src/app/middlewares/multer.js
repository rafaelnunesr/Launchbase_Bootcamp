const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => { // cb ==> callback
        cb(null, './public/images') // pasta images dentro da public
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now().toString()}-${file.originalname}`) // nome do arquivo a ser salvo
    }
})

const fileFilter = (req, file, cb) => {
    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg']
    .find(acceptedFormat => acceptedFormat == file.mimetype)

    if(isAccepted){
        return cb(null, true)
    }

    return cb(null, false)


}

module.exports = multer({
    storage,
    fileFilter // filtro de controle de imagens
})