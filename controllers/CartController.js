const { deleteById } = require("../models/ProductModel");
const db = require("../helpers/database-mysql");


exports.getCart = (req, res, next) => {
    const userId = 1;
    var totalPrice = 0;
    db.query("SELECT * FROM vw_cart_items WHERE TC_Cart_CreatedBy = ? ", [userId])
        .then(([rows]) => {
            rows.forEach(element => {
                const price = element.TCI_Quantity * element.TP_Product_Price;
                totalPrice += price;
            });
            res.render('cart.ejs', { pageTitle: "Cart", cartItems: rows, totalPrice: totalPrice});
        });
    
};

exports.addToCart = (req, res, next) => {
    const prodId = req.body.productId;
    const userId = 1;
    //console.log("Inside CartController.js-- Add to Cart Post request --> Product Id = " + prodId);
    db.query("SELECT * FROM vw_cart_items WHERE TCI_ProductId = ? AND TC_Cart_CreatedBy = ? ", [prodId, userId])
        .then(([cartRows]) => {
            //console.log(cartRows);
            if(cartRows.length == 0) {
                db.query("INSERT INTO tbl_cart (TC_CreatedBy) VALUES (?)", [userId])
                    .then(([rows]) => {
                        //console.log("Inside CartController.js-- Add to Cart Post request --> Cart Added Successfully ");
                       // console.log(rows.insertId);
                        db.query("INSERT INTO tbl_cart_items (TCI_Quantity,TCI_CartId , TCI_ProductId) VALUES (?, ?, ?)", [userId,rows.insertId, prodId])
                        .then(() => {
                           // console.log("Inside CartController.js-- Add to Cart Post request --> Cart Added Successfully ");
                        })
                        .catch(err => {
                            console.log("Err Inside CartController.js-- Add to Cart Post request ");
                            console.log(err);
                        });
                        
                       
                    })
                    .catch(err => {
                        //console.log(" Err Inside CartController.js-- Add to Cart Post request ");
                        //console.log(err);
                    });

                  

                
            } else {
                //console.log("Here");
                const updatedQuantity = Number(cartRows[0].TCI_Quantity) + 1; //Add 1, if the product already exists
                //console.log("updatedQuantity " + updatedQuantity);
                db.query("UPDATE tbl_cart_items SET TCI_Quantity = ? WHERE TCI_CartId = ? AND TCI_ProductId = ?", [updatedQuantity, cartRows[0].TC_Cart_Id, prodId])
                    .then(() => {
                            console.log("Inside CartController.js-- Add to Cart Post request --> Cart Updated Successfully ");
                    })
                    .catch(err =>{
                        console.log("Inside CartController.js");
                        console.log(err);
                    });
              
                
            }
        })
        .catch(err => {
            console.log("Inside CartController.js");
            console.log(err);
        });


    res.redirect('/shop/cart');
};


exports.removeItemFromCart = (req, res, next) => {
    const cartId = req.body.cart_id;
    db.query("DELETE FROM tbl_cart_items WHERE TCI_Id = ?", [cartId])   
        .then(result => {
            // console.log("Inside CartController, removeItemFromCart");
            // console.log(result);
            res.redirect('/shop/cart');
        })
        .catch(err => {
            console.log("Inside CartController, removeItemFromCart");
            console.log(err);
        });
};