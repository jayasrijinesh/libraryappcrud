const express = require("express");
const router = express.Router();

const bookControllr = require("../controllers/Book_Controller");
router.use(function (req, res, next) {
    // this middleware will call for each requested
    // and we checked for the requested query properties
    // if _method was existed
    // then we know, clients need to call DELETE request instead
    if (req.query._method == 'DELETE') {
        // change the original METHOD
        // into DELETE method
        req.method = 'DELETE';
        // and set requested url to /user/12
        req.url = req.path;
    }
    else if (req.query._method == 'GET') {
        // change the original METHOD
        // into GET method
        req.method = 'GET';
        // and set requested url to /user/12
        req.url = req.path;
    }
    next();
});
///////////////////////
//  Set Book Routes
///////////////////////
router.get("/", bookControllr.findAll);
router.get("/add", bookControllr.renderAdd);
router.post("/", bookControllr.create);
router.get("/:id/edit", bookControllr.renderEdit);
router.post("/:id", bookControllr.update);
router.get("/:id", bookControllr.findOne);
router.delete("/:id", bookControllr.delete);


module.exports = router;

