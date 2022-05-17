const getDB = require('../helpers/database-mongodb').getDB;


module.exports = class Product {
    constructor(id,tlt, desc='', imgURL, price) {
        this.productId = id;
        
        this.title = tlt;
        this.description = desc;
        this.imageURL = (imgURL != '') ? imgURL : "https://live.staticflickr.com/5217/5471047557_4dc13f5376_n.jpg";
        this.price = price;
    }

    save() {
        const db = getDB();
        //console.log(db);
        return db.collection('doc_products').insertOne(this)
        .then(result => {
            console.log("Inside ProductModel.js");
            console.log(result);
        })
        .catch(err => {
            console.log("Inside ProductModel.js");
            console.log(err);
        });
    }

}