const express = require("express");
const router = express.Router();
const adminControllr = require("../controllers/Admin_Controller");

///////////////////////
//  Set Admin Routes
///////////////////////
router.get('/home', adminControllr.home);
router.get("/login", adminControllr.renderLogin);
router.post("/login", adminControllr.login);
router.get("/register", adminControllr.renderRegister);
router.post("/register", adminControllr.register);


module.exports = router;

