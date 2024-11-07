const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name : {type:String, required : true},
    age : {type:Number, required : true},
    Email : {type:String, required : true, unique: true},
    photo: {type : String}
},{timestamps:true})

module.exports = mongoose.model('user',usersSchema)