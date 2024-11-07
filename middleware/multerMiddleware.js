const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {

        callback(null, 'upload')
    },
    filename: (req, file, callback) => {
        
        callback(null, file.originalname)
    }
})

exports.upload = multer({ storage })