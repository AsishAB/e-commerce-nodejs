const uri = require("./secret-data/mongodb-url");

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db; //Underscore is used just for naming convention

const MongoConnect = (callback) => {
    MongoClient.connect(uri, { useNewUrlParser: true } )
    .then(client => {
        // console.log("Inside (Helpers Folder) -> database-mongoosedb.js");
        // console.log("Connected to Mongo DB");
        _db = client.db("e-commerce-nodejs")
        callback(client); 
    })
    .catch(err => {
        console.log("Err -> Inside (Helpers Folder) ->  database-mongoosedb.js");
        console.log(err);
        throw err;
    });
}

const getDB = () => {
    if (_db) {
        return _db;
    }

    throw "Inside database-mongodb.js => No Database Found!";
}

// module.exports = MongoConnect;

exports.MongoConnect = MongoConnect;

exports.getDB = getDB;