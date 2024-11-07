const { cloudUpload } = require('../helper/couldinary')
const User = require('../Model/table')
const mailSend = require('../helper/mailhelper')

exports.addUser = async (req, res) => {
    try {
        const { name, age, Email } = req.body
        const photo = req.file
        console.log(photo)

        // Create Method  1
            const data = await User.create({
            name, 
            age,
            Email : Email
        })

        // Create Method  2 
        // const photoUpload = await cloudUpload(photo.path)
        // console.log(photoUpload)
        // const data = new User({
        //     name,
        //     age,
        //     Email: Email,
        //     // photo: photoUpload.url
        // })
        // await data.save()

        mailSend({
            to: Email,
            sub: 'Thanks for creating user',
            html: `<h1>Hi ${name} </h1>`
        })

        res.status(201).send(data)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

// Find All User
exports.getUser = async (req, res) => {
    const Users = await User.find()
    res.send(Users)
}

// Find One User by Id
exports.getEmail = async (req, res) => {
    const { email } = req.params
    const findUser = await User.findOne({ Email: email })

        if (!findUser) {
            return res.send('User is not found')
        }
        res.send(findUser)
    }


exports.deleteUser = async (req, res) => {
    const { userId } = req.params
    const user = await User.findById(userId)
    if (!user) {
        return res.send('user is not found')
    }
    await User.findByIdAndDelete(userId)
    return res.send('deleted')
}

exports.updateUser = async (req, res) => {
    const { name, age, email } = req.body
    const photo = req.file
    const { userId } = req.params
    console.log(req.body)
    // Update Method 1

    const user = await User.findById(userId)
    if (!user) {
        res.status(404).send('user is not available')
    }

    console.log(user.name)
    if (name) {
        user.name = name
    }
    if (age) {
        user.age = age
    }
    if (email) {
        user.Email = email
    }
    if (photo) {
        user.photo = photo.filename
    }

    await user.save()

    // Update Method 2

    // const user = await User.findByIdAndUpdate(userId,{name, age, email}, {new:true})

    res.status(200).send("User Updated!" + user)
}

exports.fileUpload = async (req, res) => {
    try {
        const files = req.files; // req.files is an array of files
        console.log(files);

        // Loop through each file and upload it to cloudinary
        const uploadPromises = files.map(file => cloudUpload(file.path));
        const photoUploadResults = await Promise.all(uploadPromises);

        console.log(photoUploadResults);
        res.send(photoUploadResults);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'File upload failed' });
    }
}


exports.multiFileUpload = (req, res) => {
    const { resume, photo } = req.files

    res.send(resume)
}

// module.exports = {
//     addUser,
//     getUser
// }