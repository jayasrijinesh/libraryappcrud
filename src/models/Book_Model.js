const mongoose = require('../../db');
const bookschema = new mongoose.Schema({
    name: String,
    author:String,
    genre:String,
    img:String
    // img :{
    //     data : Buffer,
    //     contentType : String
    // }
});
module.exports = mongoose.model("books",bookschema);