const products = [];


const db = require('../helpers/database-mysql');


module.exports = class Product {
    constructor(id,tlt, desc='', imgURL, price) {
        this.productId = id;
        //console.log("Inside ProductModel.js " + this.productId);
        this.title = tlt;
        this.description = desc;
        this.imageURL = (imgURL != '') ? imgURL : "https://live.staticflickr.com/5217/5471047557_4dc13f5376_n.jpg";
        this.price = price;
    }


   
    save() {
        if (this.productId) {
            return db.execute("UPDATE tbl_products SET TP_Product_Title = ?, TP_Product_Description = ?, TP_Image_URL = ?, TP_Product_Price = ?  WHERE TP_ProductId = ? ", [this.title,this.description,this.imageURL,this.price,this.productId]);
        } else {
            return db.execute("INSERT INTO tbl_products (TP_Product_Title, TP_Product_Description, TP_Image_URL, TP_Product_Price) VALUES (?, ?, ?, ? )", [this.title ,this.description , this.imageURL , this.price]);
       
        }
            
    }

    static deleteById(id) {
        return db.execute("UPDATE tbl_products SET TP_Product_DeletedFlag = true WHERE TP_ProductId = ? ", [id]);
    }

    static fetchAll() { 
        return db.execute('SELECT * FROM tbl_products');
    }

    static findById(id) {
        return db.execute("SELECT * FROM tbl_products WHERE TP_ProductId = ? ", [id]);
    }
  
}




/* 
====================================================================================================
To work with File Systems, rather than Databases
======================================================================================================

// const path = require("path");
// const rootDir = require('../helpers/user-defined-path');
// const fs = require('fs');
// const p = path.join(rootDir, 'data', 'products.json');


// const getProductsFromFile = cb => {
//     fs.readFile(p, (err, fileContent) => {
//       if (err) {
//         cb([]);
//       } else {
//         cb(JSON.parse(fileContent));
//       }
//     });
// };


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
        // The above thing can also be done by this way.     getProductsFromFile is declared above as a global value 

        // static findById(id, cb) {
        //     getProductsFromFile(products => {
                
        //       const product = products.find(p => p.productId === id);
        //       cb(product);
        //     });
        // }

        //
    }

*/