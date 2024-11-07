const userControler = require('../Controler/userControler.js')
const express = require('express')
const router = express.Router()
const {upload} = require('../middleware/multerMiddleware.js')

router.post('/add', upload.single('photo'), userControler.addUser)

router.get ('/getUser', userControler.getUser)

router.get('/get/:email', userControler.getEmail)

router.delete('/delete/:userId', userControler.deleteUser)

router.put('/update/:userId',upload.single('photo'), userControler.updateUser )

router.post('/fileUpload', upload.array('photos', 4), userControler.fileUpload )

router.post('/multiFileUpload', upload.fields([{
    name : "resume",
    maxCount : 1,
},
    {
        name : "photo",
        maxCount : 1
    }
]) ,userControler.multiFileUpload)

module.exports = router 