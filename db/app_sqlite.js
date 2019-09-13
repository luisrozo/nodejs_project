var driver = require('sqlite');

var promise = driver.open('./db.sqlite');

promise.then((driver => {
    driver.exec('CREATE TABLE IF NOT EXISTS users (name TEXT, age INT);')
        .then((driver) => {
            driver.exec('INSERT INTO users VALUES ("Luis", 42);')
                .then((driver) => {
                    driver.get('SELECT * FROM users;')
                        .then((result) => {
                            console.log(result);
                        });
                });
        }).catch((err) => {
            console.log(err);
        });
}));