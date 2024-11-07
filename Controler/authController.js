const authModel = require('../Model/authModel')
const bcrypt = require('bcrypt') // for encrypt password
const webToken = require('jsonwebtoken') // for using JSON format

exports.register = async (req, res) => {
    const { name, email, password } = req.body
    console.log('Request Body: ' + JSON.stringify(req.body, null, 2));

    try {
        const user = await authModel.findOne({ email })

        if (user) {
            return res.status(409).send('User alredy exists.')
        }
        const hashedPassword = bcrypt.hashSync(password, 10)
        await authModel.create({ name, email, password: hashedPassword })
        res.status(201).send('User create successfully')
    }
    catch (error) {
        console.log('error : ' + error)
        return res.send(error)
    }
}

exports.login =  async (req, res) => {
    const { email, password } = req.body

    try {
        const findUser = await authModel.findOne({ email })
        console.log('Auth Model : '+authModel)
        if (!findUser) {
            return res.status(404).send('User Not Found')
        }
        console.log('findUser : ' + findUser)
        const passwordMatch = bcrypt.compareSync(password, findUser.password)

        if (!passwordMatch) {
            return res.send('Password doesnt match')
        }
        const token = webToken.sign({
            name: findUser.name,
            email : findUser.email
        }, "thisiskey",{expiresIn:'1h'})
        // res.json('User Login Successfully' + token)
        return res.status(200).json({message : "User Login Successfully",token   })
    }
    catch (error) {
        console.log('error : ' + error)
        return res.send(error)
    }

}