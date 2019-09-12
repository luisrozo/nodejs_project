var mongoClient = require('mongodb').MongoClient;

var url = 'mongodb://mongodb@127.0.0.1:32768/mydb';

mongoClient.connect(url, (error, database) => {
   const db = database.db("mydb");

    db.collection('animals')
        .insertOne({
            name: "Luna",
            type: "Dog"
        }, (error, result) => {
            db.collection("animals")
                .findOne((error, result) => {
                    console.log(result);
                    database.close();
                });
        });
});

/*
mongoClient.connect(url, (error, db) => {
    db.collection('animals')
        .insertOne({
            name: "Luna",
            type: "Dog"
        }, (error, result) => {
            db.collection("animals")
                .findOne((error, result) => {
                    console.log(result);
                });
        });
});*/
