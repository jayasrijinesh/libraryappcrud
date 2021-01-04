const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/Library',{useNewUrlParser : true},
mongoose.connect('mongodb+srv://userone:userone@libraryapp.5logy.mongodb.net/MyDB?retryWrites=true&w=majority',{useNewUrlParser:true},
(err) =>{
if (!err){
    console.log('DB Connected');
}
else {
    console.log('DB Connection Failed !!');
}
} );

module.exports = mongoose;
