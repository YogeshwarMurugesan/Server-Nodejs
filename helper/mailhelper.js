const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.email,
        pass: process.env.pass
    },
    tls: { rejectUnauthorized: false }
})

// Create a transporter for Gmail service
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.email,  // Your email address from the .env file
//         pass: process.env.pass    // App-specific password from the .env file
//     }
// });

const mailSend = ({ to, sub, html }) => {
    console.log('Email:', process.env.email);
    console.log('Password:', process.env.pass);

    console.log(to, sub, html)
    const mailOption = {
        from: process.env.email,
        to: to,
        subject: sub,
        html: html
    }
    console.log(mailOption)
    transporter.sendMail(mailOption, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log('Mail sended sucessfully')
        }
    })
}

module.exports = mailSend