const mongoose = require('../../db');
const usersschema = new mongoose.Schema({
    username:String,
    password:String,
    confpassword:String,
    email:String,
    phone:String
});
module.exports = mongoose.model("users",usersschema);