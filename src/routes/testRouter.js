
//Express JS
// single quote
// no semicolon required.


const express = require('express');
const app=express();
// routes when / uri + http get request
app.get('/',function(req,res){
    res.send('this is a app get home page')
})

app.post('/',function(req,res){
    res.send('this is a post home page')
})

//all or any method to uri root /

app.all('/',function(req,res,next){
    console.log('handle all the http requests to Root')
    next()
})


// request URL /users/10/books/10100
// route path '/users/:userid/books/:bookid'
// route parameters : {"userid": "10", "booksid" :"10100"}

app.get('/users/:userid/books/:bookid',function(req,res){
    res.send(req.params)
})

//can do multiple call back functions 
app.get('/users/a',function(req,res,next){
    console.log('This is by next')
    next()
},function(req,res){
    console.log('from a')
})


//array of callback functions as parameter

var CB0= function(req,res,next){
    console.log('this will be sent by next ')
    next()
}

var CB1=function(req,res,next){
     console.log('this will be sent by next ')
     next()
}
var CB2=function(req,res){
    res.send('this will be sent by next ')
}
app.get('/users/b',[CB0, CB1,CB2])

app.route('/book')
.get(function(req,res){
    console.log('this is a get request to Book')
})
.post(function(req,res){
    console.log('this is post book req')
})


//uses app as express object

//express.route class - for routing

const express1= require('express');
const booksRouter = require('./bookRoutes');
const brouter= express1.Router();
brouter.use(function(req,res,next){
    console.log('time :' + Date.now())
    next();
})
brouter.get('/x',function(req,res){
    res.send ('hiiiiii')
})

module.exports= brouter
app.listen(5050)

//@server side
// const brouter = require('testRouter')
// app.use('/book', brouter)

//res.send res.sendFile  send.download() res.redirect