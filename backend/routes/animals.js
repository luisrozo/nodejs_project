var express = require('express');
var router = express.Router();

var viewsCount = function(req, res, next) {
    if(req.session.views === undefined) {
        req.session.views = 0;
    }

    req.session.views++;
    next();
};

router.use(viewsCount);

router.get('/', function(req, res, next) {
    console.log(req.session);
    res.send('Animals resource has been seen ' + req.session.views + ' times.');
});

module.exports = router;