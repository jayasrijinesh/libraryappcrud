const mongoose = require('../../db');
const authorschema = new mongoose.Schema({
    author:String,
    genre:String,
    img:String
    // img :{
    //     data : Buffer,
    //     contentType : String
    // }
});
module.exports = mongoose.model("author",authorschema);