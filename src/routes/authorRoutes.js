const express = require("express");
const router = express.Router();

const authorControllr = require("../controllers/author_Controller");
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
//  Set author Routes
///////////////////////
router.get("/", authorControllr.findAll);
router.get("/add", authorControllr.renderAdd);
router.post("/", authorControllr.create);
router.get("/:id/edit", authorControllr.renderEdit);
router.post("/:id", authorControllr.update);
router.get("/:id", authorControllr.findOne);
router.delete("/:id", authorControllr.delete);


module.exports = router;

