const Mongoose = require('mongoose')


Mongoose.connect('mongodb://localhost:27017/Library')
const Schema= Mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    password: String,
})

//instance of model is a document
var UserData = Mongoose.model('users',UserSchema)
module.exports= UserData;