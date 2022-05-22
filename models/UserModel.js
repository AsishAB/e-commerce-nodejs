//const db = require('../helpers/database-mysql');
const getDB = require('../helpers/database-mongodb').getDB;
const mongodb = require('mongodb');


module.exports = class User {
    constructor (firstName, lastName, userRole, email, mobNo, password) {
        this.TUM_FirstName = firstName;
        this.TUM_LastName= lastName;
        this.TUM_Role= userRole ? userRole : 'customer';
        this.TUM_Email= email;
        this.TUM_MobileNo= mobNo;
        this.TUM_Password= password;
    }

    save() {
        const db = getDB();
        return db.collection('doc_users').insertOne(this)
            // .then(result => {
            //     console.log("Inside UserModel");
            //     console.log("User Created Successfully");
            //     console.log(result);
            // })
            // .catch(err => {
            //     console.log("Inside UserModel");
            //     console.log(err);
                
            // });
    }

    static findUserById(userId) {
        const db = getDB();
        return db.collection('doc_users').findOne( {_id: new mongodb.ObjectId(userId)} ).next() //find() also works
            // .then(result => {

            // })
            // .catch(err => {
            //     console.log("Inside UserModel");
            //     console.log(err);
            // });
    }
}