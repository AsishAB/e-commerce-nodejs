
const uri = "mongodb+srv://RememberMeAsish:vUarAawV333Dx2n1@asishcluster.rjwov.mongodb.net/?retryWrites=true&w=majority";


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     console.log("Inside (Helpers Folder) database-mongoosedb.js");
//     console.log(err);
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;


const MongoConnect = (callback) => {
    MongoClient.connect(uri, { useNewUrlParser: true } )
    .then(client => {
        console.log("Inside (Helpers Folder) -> database-mongoosedb.js");
        console.log("Connected to Mongo DB");
        callback(client); 
    })
    .catch(err => {
        console.log("Err -> Inside (Helpers Folder) ->  database-mongoosedb.js");
        console.log(err);
    });
}



module.exports = MongoConnect;