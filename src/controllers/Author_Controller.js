/*
 * authors Controller - All Business Logic Comes here 
 */
const { render } = require('ejs');
const Author = require('../models/Author_Model');
const fs = require('fs');

/**************Render Add New Author Page */
exports.renderAdd = (req, res) => {
  console.log('inside render add Author page');
  res.render("addauthor",
    {
      title: 'Add New Author',
      nav: [{ name: 'Go Back', link: '../authors' }]
    });
}

/************Create author**************/
exports.create = (req, res) => {
  //console.log('inside create' + req.query.authorName);
  /*** validation request  */
  if ( !req.body.AuthorName || !req.body.Genre || !req.body.imgUpload) {
    return res.status(400).send({
      message: "Required field can not be empty",
    });
  }

  var author = new Author({
       author: req.body.AuthorName,
    genre: req.body.Genre,
    img: req.body.imgUpload
  });
 
  author.save()
    .then((data) => {
      console.log('saved successfully');
      res.redirect('/authors');
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the author.",
      });
    });
};

/************Find All authors**************/
exports.findAll = (req, res) => {
  Author.find()
    .then((authors) => {
      //console.log('find all' + authors.length);
      res.render("authors",
        {
          title: 'Authors',
          nav: [{ name: 'Books', link: '/books' }, { name: 'Authors', link: '/authors' }, { name: 'Add Author', link: '/authors/add' }],
          authors

        });

    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error Occured",
      });
      console.log('find all error');
    });
};

/************Find One author**************/
exports.findOne = (req, res) => {
  console.log('inside findone');
  Author.findById(req.params.id)
    .then((author) => {
      if (!author) {
        return res.status(404).send({
          message: "author not found with id " + req.params.id,
        });
      }
      res.render("author",
        {
          title: 'Author -' + author.name,
          nav: [{ name: 'Books', link: '/books' }, { name: 'Authors', link: '/authors' }, { name: 'Add Author', link: '/authors/add' }],
          author

        });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving author with id " + req.params.id,
      });
    });
};

/**************Render Edit/Update author Page */
exports.renderEdit = (req, res) => {
  console.log('inside edit');
  Author.findById(req.params.id)
    .then((author) => {
      if (!author) {
        return res.status(404).send({
          message: "author not found with id " + req.params.id,
        });
      }
      console.log(author);
      res.render("editauthor",
      {
        title: 'Edit Author',
        nav: [{ name: 'Go Back', link: '/authors' }],
        author
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving author with id " + req.params.id,
      });
    });

}


/************Update author**************/
exports.update = (req, res) => {
  const id = req.params.id;
  // console.log('inside update');
  // console.log('body' + req.body)
  // console.log('query' + req.query)
  var author = {
    author: req.body.AuthorName,
    genre: req.body.Genre,
    img: req.body.imgUpload
  };
  console.log('author' +author);
  if (!req.body.AuthorName || !req.body.Genre || !req.body.imgUpload) {
    res.status(400).send({
      message: "required fields cannot be empty",
    });
  }
  
 Author.findByIdAndUpdate(req.params.id, author, { new: true })
    .then((author) => {
      if (!author) {
        return res.status(404).send({
          message: "no author found",
        });
      }
      //res.status(200).send(author);
      console.log(author)
      console.log('saved successfully');
      res.redirect('/authors');
    })
    .catch((err) => {
      return res.status(404).send({
        message: "error while updating the author",
      });
    });
};
/************Delete author**************/
exports.delete = (req, res) => {

  Author.findByIdAndRemove(req.params.id)
    .then((author) => {
      if (!author) {
        return res.status(404).send({
          message: "author not found ",
        });
      }
      
      res.redirect('/authors');
      // res.send({ message: "author deleted successfully!" });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Could not delete author " + err,
      });
    });
};