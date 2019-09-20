var express = require('express');
var validator = require('validator');
var router = express.Router();

const collection = 'carts';

function validateLoggedUser(req, res, next) {
    if(req.session.logged) {
        next();
    } else {
        res.status(401).send('You are not authorised');
    }
}

router.use(validateLoggedUser);

router.post('/', function(req, res, next) {
    var items = req.body.cart;

    if(validateCart(items)) {

        var db = req.app.get('db');

        items.user = {
            name: req.session.name,
            email: req.session.email,
        };

        db.collection(collection)
            .insertOne(items, (err, resp) => {
                if(!err) {
                    res.status(201).send(resp);
                } else {
                    res.status(500).send('ERROR');
                }
            });

    } else {
        res.status(403).send('ERROR');
    }

});

function validateCart(items) {
    var validCart = true;

    // 'items' must be a valid JSON, 'products' must be defined and an array, too.
    if(!validator.isJSON(JSON.parse(items)) ||
            items['products'] === undefined ||
            !Array.isArray(items.products)) {

        validCart = false;

    }

    // each 'product' must have its fields of type String
    items.products.forEach((product) => {
        if(validCart) {
            if(!product.id instanceof String ||
                    !product.name instanceof String ||
                    !product.price instanceof String) {

                validCart = false;

            }
        }
    });

    return validCart;
}

module.exports = router;
