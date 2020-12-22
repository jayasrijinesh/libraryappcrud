const { render } = require('ejs');
const express = require('express');
const authorsRouter = express.Router();


var authors = [
    {
        name: 'Max Brallier',//'The Last Kids on Earth',
        author: '',
        genre: 'Kids',
        img: 'Max Brallier.jpg'

    },
    {
        name: 'Barton Seavor', //'National Geographic Kids Cookbook',
        author: '',
        genre: 'Kids',
        img: 'Barton Seaver.jpg'

    }
]
authorsRouter.get('/', function (req, res) {

    res.render("authors",
        {
            title: 'Authors',
            nav: [{ name: 'Books', link: '/books' }, { name: 'Authors', link: '/authors' }, { name: 'Add Author', link: '/authors/add'}],
            authors

        });


});

authorsRouter.get('/add', function (req, res) {

    res.render("addauthor",
        {
            title: 'Add New Author',
            nav: [{ name: 'Go Back', link: '../authors' }]
        });
});


authorsRouter.get('/:id', function (req, res) {
    var id = req.params.id
    res.render("author",
        {
            title: 'Author',
            nav: [{ name: 'Books', link: '/books' }, { name: 'Authors', link: '/authors' }],
            author: author[id]
        });
});

authorsRouter.post('/Success',function (req,res){

    res.render("authors",
        {
            title: 'Authors',
            nav: [{ name: 'Books', link: '/books' }, { name: 'Authors', link: '/authors' }, { name: 'Add Author', link: '/authors/add'}],
            authors

        });

});


module.exports= authorsRouter;

