const { render } = require('ejs');
const express = require('express');
//var path = require('path');
//var parser = require('body-parser');
const UserData= require('../model/UserData');

const adminRouter = express.Router();



function router(nav) {
    // adminRouter.get('/', function(req,res){
    //     res.render("addbook",
    //     {
    //         title: 'Login',
    //         nav
    //     })
    // })
    adminRouter.get('/login', (req, res) => {
        res.render("login",
            {
                title: 'Login',
                //nav
                nav: [ { name: 'Register', link: '/admin/register'}]
            })
    })
    

    // adminRouter.post("/login",passport.authenticate("local",{
    //     successRedirect:"/index",
    //     failureRedirect:"/login"
    // }),function (req, res){
    // });

    adminRouter.post("/login", (req,res) => {
        console.log(req.body());
    })
    adminRouter.post('/', function(req, res) {  
        console.log("inside admin routes")   ;
        UuserData.findOne({
                user: req.body.username,
            }, function(err, item) {
                if (err) return res.send();
    
                // If the username is not found or the login password doesn't match the user's password
                if (!item) {
                    console.log("The username is not valid\n");
                    res.render('login', { lerr: true });
                } else {
                    if (req.body.password !== item.password) {
                        console.log("The password is not correct\n");
                        res.render('login', { lerr: true });
                    } else {
                        console.log("The entry is correct!\n");
                        res.redirect('/index');
                    }
                }
            
        
            });
        });


        adminRouter.get('/register', (req, res) => {
            res.render("register",
                {
                    title: 'Register',
                    nav
                })
        })

        adminRouter.post("/register",(req,res)=>{
    
            User.register(new User({username: req.body.username,phone:req.body.phone,telephone: req.body.telephone}),req.body.password,function(err,user){
                if(err){
                    console.log(err);
                    res.render("register");
                }
            passport.authenticate("local")(req,res,function(){
                res.redirect("/login");
            })    
            })
        })
        
        
    return adminRouter;
}


module.exports = router



