const products = [];
const path = require("path");
const rootDir = require('../helpers/user-defined-path');
const fs = require('fs');
const p = path.join(rootDir, 'data', 'products.json');
/*
const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
};

*/
module.exports = class Product {
    constructor(id,tlt, desc='', imgURL, price) {
        this.productId = id;
        //console.log("Inside ProductModel.js " + this.productId);
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
            if (this.productId) {
                //console.log("Inside ProductModel.js " + this.productId);
                const existingProductIndex = products_arr.findIndex(p => p.productId === this.productId);
                const updatedProducts = [...products_arr];
                updatedProducts[existingProductIndex] = this;
                //console.log("Inside ProductModel.js " + updatedProducts[existingProductIndex].title );
                
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => { //Notice updatedProducts is written
                    console.log(err);
                });

            } else {
                this.productId = Math.random().toString();
                products_arr.push(this);
                fs.writeFile(p, JSON.stringify(products_arr), (err) => { //Here products_arr is written
                    console.log(err);
                });
            }
            
            

            

        });

    }

    static deleteById(id) {
        //Item must also be deleted from cart
        fs.readFile(p, (err, fileContent) => {
            fileContent = JSON.parse(fileContent);
            const updatedProducts = fileContent.filter(pd => pd.productId !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if(err) {
                    console.log("Inside Product Model " + err);
                }
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

    static findById(id, cb) {
        let products_arr = [];
        fs.readFile(p, (err, fileContent) => {
            if (!err) {
                // If the file exists and has I/O Permission
                products_arr = JSON.parse(fileContent);
            }
            const productById = products_arr.find(p => p.productId === id);
            //{

                //console.log(id);
              //  p.productId === id; //An implicit or hidden return is included in such JavaScript functions
           // });
            //console.log(productById);
            cb(productById);
            


        });
        /* The above thing can also be done by this way.     getProductsFromFile is declared above as a global value 

        // static findById(id, cb) {
        //     getProductsFromFile(products => {
                
        //       const product = products.find(p => p.productId === id);
        //       cb(product);
        //     });
        // }

        */
    }
  
}