const products = [];
const path = require("path");
const rootDir = require('../helpers/user-defined-path');
const fs = require('fs');
const p = path.join(rootDir, 'data', 'products.json');

module.exports = class Product {
    constructor(tlt, desc='', imgURL, price) {
        this.productId = 2;
        this.title = tlt;
        this.description = desc;
        this.imageURL = (imgURL != '') ? imgURL : "https://live.staticflickr.com/5217/5471047557_4dc13f5376_n.jpg";
        this.price = price;
    }


    //For methods - i.e functions which are a part of a class, the keyword "function" is not used 
    save() {
        //products.push(this);
        
        let products_arr = [];
        fs.readFile(p, (err, fileContent) =>{
            if (!err) {
                // If the file exists and has I/O Permission
                products_arr = JSON.parse(fileContent);
            }
            products_arr.push(this);

            fs.writeFile(p, JSON.stringify(products_arr), (err) => {
                console.log(err);
            });

        });

    }



    static fetchAll(cb) { //cb is a callback, which returns a value
        
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                //return []; // If any error occurs while reading a file, return an empty array
                cb([]);
            }

            cb(JSON.parse(fileContent));
        });

        //return products;
    }
}