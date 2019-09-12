var express = require('express');
var router = express.Router();

/* Content-type of each request must be application/json */

var validation = function(req, res, next) {
    if(req.get("content-type") === "application/json") {
        console.log("Request validated");
    } else {
        res.status(403).send("ERROR");
    }

    next();
};

var viewsCount = function(req, res, next) {
    if(req.session.views === undefined) {
        req.session.views = 0;
    }

    req.session.views++;
    next();
};

router.use(validation);
router.use(viewsCount);

router.get('/', function(req, res, next) {
    console.log(req.session);
    res.send('Animals resource has been seen ' + req.session.views + ' times.');
});

router.post('/', function(req, res, next) {
   if(!req.session.animals) {
       req.session.animals = [];
   }

   var body = req.body;

   if(req.get("content-type") === "application/json") {
        console.log("Request validated");
   } else {
       res.status(403).send("ERROR");
   }

   req.session.animals.push(body);
   console.log(req.session);

   res.send('Request has been received');
});

module.exports = router;