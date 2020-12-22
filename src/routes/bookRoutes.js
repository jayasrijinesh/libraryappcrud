const { render } = require('ejs');
const express = require('express');
const booksRouter = express.Router();
const fs = require('fs');
const BookData= require('../model/BookData');


// var books = [
//     {
//         name: 'The Last Kids on Earth',
//         author: 'Max Brallier',
//         genre: 'Kids',
//         img: 'lastkids.jpg'

//     },
//     {
//         name: 'National Geographic Kids Cookbook',
//         author: 'Barton Seavor',
//         genre: 'Kids',
//         img: 'cookbook.jpg'

//     }
// ]
    function Router(nav){

    booksRouter.get('/', function (req, res) {
        // res.render("books",
        //     {
        //         title: 'Books',
        //         nav: [{ name: 'Books', link: '/books' }, { name: 'Authors', link: '/authors' },{ name: 'Add New Book', link: '/books/add' }],
        //         books
    
        //     });
        BookData.find()
        .then((books)=>{
            res.render("books",{
                title: 'Books',
                nav,
                books
            })
        })
        
    });
    booksRouter.get('/add', function (req, res) {

        res.render("addbook",
            {
                title: 'Add New Book',
                nav: [{ name: 'Go Back', link: '../books' }]
            });
    });
    
    //On Successfull completion of add New book, redirects to this page
    booksRouter.get('/Success',function (req,res){
        var newBook = {
            name: req.query.BookName,
            author:req.query.AuthorName,
            genre:req.query.Genre,
            img:req.query.imgUpload
        }
        var book = BookData(newBook);
        var upload= multer({ dest: '../../uploads/' })
        //import multer from 'multer';
        book.img.data = fs.readFileSync(req.files.imgUpload.path)
        book.img.contentType ='image/png';
        book.save();
        //res.send("added new Book");
        res.redirect('/books');
    })





    booksRouter.post('/Success',function (req,res){
        var newBook = {
            name: req.body.BookName,
            author:req.body.AuthorName,
            genre:req.body.Genre,
            img:req.body.imgUpload
        }
        var book = BookData(newBook);
        book.save();
        //res.send("added new Book");
        res.redirect('/books');
    })   


    booksRouter.get('/:id', function (req, res) {
        var id = req.params.id
        BookData.findOne({_id : id})
        .then((book)=>{
            res.render("book",
            {
                title: 'Book -' + book.name,
                nav,
                book
            });
        })
        // res.render("book",
        //     {
        //         title: 'Book',
        //         nav: [{ name: 'Books', link: '/books' }, { name: 'Authors', link: '/authors' }],
        //         book: books[id]
        //     });
    });
    
  
    booksRouter.get('/edit/:id', function (req, res) {
        var id = req.params.id
        BookData.findOne({_id : id})
        .then((book)=>{
            res.render("book",
            {
                title: 'Book -' + book.name,
                nav,
                book
            });
        })
        // res.render("book",
        //     {
        //         title: 'Book',
        //         nav: [{ name: 'Books', link: '/books' }, { name: 'Authors', link: '/authors' }],
        //         book: books[id]
        //     });
    });
    
    
    booksRouter.get('/addNewBook', function(req,res){
        res.render('addbook',{
            title:'Add Book',
            nav: [{name : 'Go Back',link : '/books'}]
        })
    })

    return booksRouter
}

module.exports= Router;

