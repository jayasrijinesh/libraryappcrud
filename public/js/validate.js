
$(document).ready(function(){

$(function validateLogin() {
    $("#sendlogin").on("click", function () {
        if ($("#username").val() == "" && $("#password").val() == "") {
            alert("Please Provide User Name and Password !!!"); 
        }
        //  else if ($("#username").val() =="admin" && $("#password").val() == "admin1234") {
         //    return true;
         
        // var loginQuery = {
        //     loginUname: $("#username").val(),
        //     loginPword: $("#password").val()
        // };
        // var req = new XMLHttpRequest();
        // req.open("POST", 'admin/login', true);
        // req.setRequestHeader('Content-Type', 'application/json');
        // req.send(JSON.stringify(loginQuery));
        // event.preventDefault();
    // }
    })


    
});
$("#addAuthor").on("click" , function() {
 console.log("add author client side validation hit");
});

$(function validateRegistration(){
//$("#sendregister").on("click",function(){
    var uname = $("#username").val() ;
    var pwd =  $("#password").val() ;
    var cpwd =  $("#confpassword").val() ;
    var email =  $("#email").val() ;
    var phone =  $("#phone").val() ;
        
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(uname =='')
    {
        alert("please enter user name.");
        return false;
    }
    else if(pwd=='')
    {
        alert("enter the password");
        return false;
    }
    else if(cpwd=='')
    {
        alert("kindly confirm the password");
        return false;
    }
    else if(email=='')
    {
        alert("enter the email address");
        return false;
    } 
    else if(phone=='')
    {
        alert("enter the Contact Number");
        return false;
    }
    else if(!filter.test(email))
    {
        alert("Enter valid email id.");
        return false;
    }
    else if(pwd.length < 6 || pwd.length > 6)
    {
        alert("Password min and max length is 6.");
        return false;
    }    
    else if(pwd!=cpwd)
    {
        alert("Password didn't match");
        return false;
    }
    else
    {
alert('Thank You for Registering with Library Application & You are Redirecting to Library');
//Redirecting to other page or webste code or you can set your own html page.
   //window.location = "http://www.localhost:2000";
   return true;
        }





});
})