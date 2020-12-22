// const express = require('express');
// const app = express();
// app.get('/',function(req,res){
//     res.sendFile(__dirname + "/src/views/index.html");
// });

// app.listen(5050);

const { render } = require('ejs');
const express = require('express');
// const session = require('express-session');
// const bodyParser = require('body-parser');
const multer = require('multer')
const port= process.env.port || 2000;


//Navigation Bar
const    nav= [
    //link and title
    { name: 'Books', link: '/books' }, 
    { name: 'Authors', link: '/authors' },
    { name: 'Login', link: '/admin/login'},
    { name: 'Register', link: '/admin/register'}
];
const    nav1= [
    //link and title
    { name: 'Books', link: '/books' }, 
    { name: 'Authors', link: '/authors' },
    { name: 'Add Book', link: '/books/add'},
    { name: 'LogOut', link: '/logout'}
];

//Importing the Routers
const booksRouter= require('./src/routes/bookRoutes')(nav1)
const authorsRouter=require('./src/routes/authorRoutes')
const adminRouter=require('./src/routes/adminRoutes')(nav)

const mongoose              =  require("mongoose")
// passport              =  require("passport"),
// bodyParser            =  require("body-parser"),
// LocalStrategy         =  require("passport-local"),
// passportLocalMongoose =  require("passport-local-mongoose"),
// User                  =  require("./models/user");
//Connecting database
//mongoose.connect('mongodb://localhost:27017/Library')

const app = express();


// //Session Initialization  secret‘ is used for cookie handling

// app.use(require("express-session")({
//     secret:"jayasri",       //decode or encode session
//     resave: false,          
//     saveUninitialized:false    
// }));


// app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
// app.use(bodyParser.json());      
// app.use(bodyParser.urlencoded({extended: true}));

// passport.serializeUser(User.serializeUser());       //session encoding
// passport.deserializeUser(User.deserializeUser());   //session decoding
// passport.use(new LocalStrategy(User.authenticate()));
app.set("view engine","ejs");
// app.use(bodyParser.urlencoded(
//       { extended:true }
// ))
// app.use(passport.initialize());
// app.use(passport.session());

//Middleware to Parse POST request
//app.use(express.urlencoded({extended:true}));

//Middleware 


//Make Public folber public to user using express.static function
app.use(express.static(__dirname + "/public"));
//app.use(express.static('./public'));

//Set Template View Engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

//====================================
//    Routes Setup
//====================================
app.use('/books', booksRouter);
app.use('/authors',authorsRouter);
app.use('/admin',adminRouter);
//app.use('/login',adminRouter);

var sess;
app.get('/', function (req, res) {
    //res.sendFile(__dirname + "/src/views/index.html");

    // sess = req.session;
    // if(sess.email) {
    //     return res.redirect('/admin');
    // }
    res.render("index",
        {
            title: 'Library',
            nav: [ {name: 'Login', link: '/admin/login'},{name: 'Register', link: '/admin/register'},     { name: 'Books', link: '/books' }, { name: 'Authors', link: '/authors' }]
        });

});



app.listen(port,()=>{console.log("server ready at "+port)});
