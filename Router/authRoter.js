const express = require('express')
const router = express.Router()
const auth = require('../Model/authModel')
const authController = require('../Controler/authController')


router.post('/register', authController.register) 

router.post('/login', authController.login)

module.exports = router



