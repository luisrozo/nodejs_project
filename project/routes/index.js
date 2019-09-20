var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express',
        page: 'pages/login',
        footer: 'pages/footer',
        data: {
            content: 'This is the login page',
        },
    });
});

router.get('/db', function(req, res, next) {
    var db = req.app.get('db');
    console.log(db);
    res.send('Request received');
});

module.exports = router;
