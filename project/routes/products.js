var express = require('express');
var router = express.Router();

const collection = 'products';

function validateLoggedUser(req, res, next) {
    if(req.session.logged) {
        next();
    } else {
        res.status(401).send('You are not authorised');
    }
}

router.use(validateLoggedUser);

router.get('/', function(req, res, next) {
    var db = req.app.get('db');

    db.collection(collection).find().toArray((err, docs) => {
        if(!err) {
            res.send({ products: docs });
        } else {
            res.status(500).send('ERROR');
        }
    });

});

module.exports = router;
