/*
 * Admin Controller - All Business Logic Comes here 
 */
const { render } = require('ejs');
const Users = require('../models/User_Model');


/************** Render Login Page */
exports.renderLogin = (req, res) => {
  console.log('inside login page');
  res.render("login",
    {
      title: 'Login',
      nav: [{ name: 'Go Back', link: '/' },{ name: 'Register', link: '/admin/register'}]
    });
}


/************Handle Login request**************/
exports.login = (req, res) => {
  console.log('inside click login')   ;
    /*** validation request  */
    if ( !req.body.username || !req.body.password ) {
      return res.status(400).send({
        message: "Required field can not be empty",
      });
    }
  Users.findOne({
          username: req.body.username,
      }, function(err, item) {

        console.log(item)
        console.log(req.body)
          if (err) return res.send();
          // If the username is not found or the login password doesn't match the user's password
          if (!item) {
              console.log("The username is not valid\n");
              res.redirect('/admin/login')
          } else {
              if (req.body.password !== item.password) {
                  console.log("The password is not correct\n");
                  res.redirect('/admin/login')
              } else {
                  console.log("The entry is correct!\n");
                  res.redirect('/');
              }
          }
      
  
      });
    }



/************** Render Register Page */
exports.renderRegister = (req, res) => {
  console.log('inside register page');
  res.render("register",
    {
      title: 'Registration',
      nav: [{ name: 'Go Back', link: '/' },{ name: 'login', link: '/admin/login'}]
    });
}

/************** Register user to application */
exports.register = (req, res) => {
  console.log('inside add user at regi');
var user = new Users({
  username: req.body.username,
  password: req.body.password,
  confpassword: req.body.confpassword,
  email: req.body.email,
  phone: req.body.phone
});

user.save()
  .then((data) => {
    console.log('saved successfully');
    res.redirect('/admin/home');
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the book.",
    });
  });
}
  

exports.home = (req,res) => {
  res.render("index",
      {
          title: 'Library',
          nav: [ {name: 'Login', link: '/admin/login'},{name: 'Register', link: '/admin/register'},     { name: 'Books', link: '/books' }, { name: 'Authors', link: '/authors' }]
      });

};

// User.register(new User({username: req.body.username,phone:req.body.phone,telephone: req.body.telephone}),req.body.password,function(err,user){
//   if(err){
//       console.log(err);
//       res.render("register");
//   }
// passport.authenticate("local")(req,res,function(){
//   res.redirect("/login");
// })    
// })
