const getDB = require('../helpers/database-mongodb').getDB;


module.exports = class Product {
    constructor(id,tlt, desc='', imgURL, price) {
        this.TP_ProductId = id;
        
        this.TP_Product_Title = tlt;
        this.TP_Product_Description = desc;
        this.TP_Image_URL = (imgURL != '') ? imgURL : "https://live.staticflickr.com/5217/5471047557_4dc13f5376_n.jpg";
        this.TP_Product_Price = price;
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