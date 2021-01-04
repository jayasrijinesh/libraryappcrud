
//Importing Modules/Middleware/Library
const { render } = require('ejs');
const express = require('express');
//const bodyParser = require('body-parser');

const app = express();

// middleware
 app.use(express.json());
 app.use(express.urlencoded({extended: true}));

 
// // parse application/json
//  app.use(bodyParser.json())
//  app.use(bodyParser.urlencoded({ extended: true }))

 //Make the folder named 'public' accessible publically
app.use(express.static(__dirname + "/public"));

//Set Template View Engine
app.set('view engine', 'ejs');
app.set('views', './src/views');


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
const dbCon=require('./db')
//====================================
//    Routes Setup
//====================================

app.get('/', function (req, res) {
    res.render("index",
        {
            title: 'Library',
            nav: [ {name: 'Login', link: '/admin/login'},{name: 'Register', link: '/admin/register'},     { name: 'Books', link: '/books' }, { name: 'Authors', link: '/authors' }]
        });

});

app.use("/authors", require("./src/routes/authorRoutes"));
app.use("/books", require("./src/routes/bookRoutes"));
app.use("/admin", require("./src/routes/adminRoutes"));
const port= process.env.port || 2000;
app.listen(port,()=>{console.log("server ready at "+port)});
