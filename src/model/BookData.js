const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Library')
const passportLocalMongoose = require("passport-local-mongoose");
const Schema= mongoose.Schema;
const BookSchema = new Schema({
    name: String,
    author:String,
    genre:String,
    //img:String
    img :{
        data : Buffer,
        contentType : String
    }
})

const UserSchema = new Schema({
    name: String,
    password: String,
    email:String,
    telephone: Number
})
UserSchema.plugin(passportLocalMongoose);
//instance of model is a document
var BookData = mongoose.model('book', BookSchema)
//var UserData = mongoose.model('Users', UserSchema)
module.exports = BookData;
//module.exports = UserData;

/*
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    phone:Number,
    telephone:Number
}) ;
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",UserSchema);
*/
