var express = require('express');
var router = express.Router();
var crypto = require('crypto');

const collection = 'users';

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/*router.get('/:name', function(req, res, next) {
    var db = req.app.get('db');
    var cursor = db.collection(collection).find({
       name: req.params.name,
    });

    var result;
    cursor.on('data', (d) => {
        result = d;
    });
    cursor.on('end', () => res.send(result));
});*/

router.post('/login', function(req, res, next) {
    var logged = req.session.logged;
    var db = req.app.get('db');

    if(!logged) {
        var email = req.body.email;
        var pass = req.body.pass;

        if(!email || !pass) {
            res.status(403).send('ERROR');
        }

        var cursor = db.collection(collection).find({
            email: email,
            pass: crypto.createHash('sha384').update(pass, 'utf8').digest(),
        });

        var result = null;
        cursor.on('data', (u) => {
            result = u;
        });
        cursor.on('end', () => {
            if(result !== null) {
                req.session.logged = true;
                req.session.name = result.name;
                req.session.email = result.email;
                res.status(200).send('Logged successfully');
            } else {
                req.session.logged = false;
                req.status(401).send('No authorised');
            }
        });
    } else {
        req.session.logged = false;
        res.send('User is already logged');
    }
});

router.post('/', function(req, res, next) {
    var db = req.app.get('db');
    var user = req.body;

    if(validateSignUp(user)) {
        user.pass = crypto.createHash('sha384').update(user.pass, 'utf8').digest();
        db.collection(collection)
            .insertOne(user, (err, resp) => {
                res.send(resp);
            });
    } else {
        res.status(403).send('ERROR');
    }

});

function validateSignUp(user) {
    if(user === undefined || user === null) {
        return false;
    }

    // use RegEX
    if(!user.name || !user.pass || !user.email) {
        return false;
    }

    return true;
}

module.exports = router;
