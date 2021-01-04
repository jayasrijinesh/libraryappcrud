/*
 * books Controller - All Business Logic Comes here 
 */
const { render } = require('ejs');
const Books = require('../models/Book_Model');
const fs = require('fs');

/**************Render Add New Book Page */
exports.renderAdd = (req, res) => {
  console.log('inside render add book page');
  res.render("addbook",
    {
      title: 'Add New Book',
      nav: [{ name: 'Go Back', link: '../books' }]
    });
}



/************Create book**************/
exports.create = (req, res) => {
  //console.log('inside create' + req.query.BookName);
  /*** validation request  */
  if (!req.body.BookName || !req.body.AuthorName || !req.body.Genre || !req.body.imgUpload) {
    return res.status(400).send({
      message: "Required field can not be empty",
    });
  }

  var book = new Books({
    name: req.body.BookName,
    author: req.body.AuthorName,
    genre: req.body.Genre,
    img: req.body.imgUpload
  });
 
  book.save()
    .then((data) => {
      console.log('saved successfully');
      res.redirect('/books');
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the book.",
      });
    });
};

/************Find All book**************/
exports.findAll = (req, res) => {
  Books.find()
    .then((books) => {
      //console.log('find all' + books.length);
      res.render("books",
        {
          title: 'books',
          nav: [{ name: 'Books', link: '/books' }, { name: 'Authors', link: '/authors' }, { name: 'Add Book', link: '/books/add' }],
          books

        });

    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error Occured",
      });
      console.log('find all error');
    });
};

/************Find One book**************/
exports.findOne = (req, res) => {
  console.log('inside findone');
  Books.findById(req.params.id)
    .then((book) => {
      if (!book) {
        return res.status(404).send({
          message: "book not found with id " + req.params.id,
        });
      }
      res.render("book",
        {
          title: 'Book -' + book.name,
          nav: [{ name: 'Books', link: '/books' }, { name: 'Authors', link: '/authors' }, { name: 'Add Book', link: '/books/add' }],
          book

        });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving book with id " + req.params.id,
      });
    });
};

/**************Render Edit/Update Book Page */
exports.renderEdit = (req, res) => {
  console.log('inside edit');
  Books.findById(req.params.id)
    .then((book) => {
      if (!book) {
        return res.status(404).send({
          message: "book not found with id " + req.params.id,
        });
      }
      console.log(book);
      res.render("editbook",
      {
        title: 'Edit Book',
        nav: [{ name: 'Go Back', link: '/books' }],
        book
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving book with id " + req.params.id,
      });
    });

}


/************Update book**************/
exports.update = (req, res) => {
  const id = req.params.id;
  // console.log('inside update');
  // console.log('body' + req.body)
  // console.log('query' + req.query)
  var book = {
    name: req.body.BookName,
    author: req.body.AuthorName,
    genre: req.body.Genre,
    img: req.body.imgUpload
  };
  console.log('book' +book);
  if (!req.body.BookName || !req.body.AuthorName || !req.body.Genre || !req.body.imgUpload) {
    res.status(400).send({
      message: "required fields cannot be empty",
    });
  }
  
 Books.findByIdAndUpdate(req.params.id, book, { new: true })
    .then((book) => {
      if (!book) {
        return res.status(404).send({
          message: "no book found",
        });
      }
      //res.status(200).send(book);
      console.log(book)
      console.log('saved successfully');
      res.redirect('/books');
    })
    .catch((err) => {
      return res.status(404).send({
        message: "error while updating the book",
      });
    });
};
/************Delete book**************/
exports.delete = (req, res) => {

  Books.findByIdAndRemove(req.params.id)
    .then((book) => {
      if (!book) {
        return res.status(404).send({
          message: "Book not found ",
        });
      }
      
      res.redirect('/books');
      // res.send({ message: "Book deleted successfully!" });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Could not delete book " + err,
      });
    });
};