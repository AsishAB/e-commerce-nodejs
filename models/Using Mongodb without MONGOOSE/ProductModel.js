const mongodb = require('mongodb');
const getDB = require('../helpers/database-mongodb').getDB;


module.exports = class Product {
    constructor(id,tlt, desc='', imgURL, price) {
        this._id = (id != '' && id != null) ? new mongodb.ObjectId(id) : null;
        
        this.TP_Product_Title = tlt;
        this.TP_Product_Description = desc;
        this.TP_Image_URL = (imgURL != '') ? imgURL : "https://live.staticflickr.com/5217/5471047557_4dc13f5376_n.jpg";
        this.TP_Product_Price = price;
        this.TP_Created_By = null;
    }

    save() {
        const db = getDB();
        if (this._id) {
            
            return db.collection('doc_products').updateOne({ _id: new mongodb.ObjectId(this._id) } , { $set: this });

            //can also be done as

            // return db.collection('doc_products').updateOne({ _id: new mongodb.ObjectId(this._id) } , { $set: { TP_Product_Title:this.title, ....} });
        } else {
            
            //console.log(db);
            return db.collection('doc_products').insertOne(this)
            .then(result => {
                // console.log("Inside ProductModel.js");
                // console.log(result);
            })
            .catch(err => {
                console.log("Inside ProductModel.js");
                console.log(err);
            });
        }
        
    }

    static fetchAll() {
        const db = getDB();
        return db.collection('doc_products').find().toArray() 
            .then(products => {
                //console.log("Inside ProductModel.js");
                //console.log(products);
                return products;
            })
            .catch(err => {
                console.log("Inside ProductModel.js");
                console.log(err);
            });

        //The reason to use .toArray() is because .find() does not return a promise.
    }

    static findById(prodId) {
        const db = getDB();
        return db.collection('doc_products').find({_id: new mongodb.ObjectId(prodId)}).next()
            .then(product => {
                // console.log("Inside ProductModel.js");
                // console.log(product);
                return product;
            })
            .catch(err => {
                console.log("Inside ProductModel.js");
                console.log(err);
            });


        //The reason to use .toArray() is because .find() does not return a promise.
    }

    static deleteById(prodId) {
        const db = getDB();
        return db.collection('doc_products').deleteOne({ _id: new mongodb.ObjectId(prodId) })
    }

}