const { deleteById } = require("../models/ProductModel");
const getDB = require("../helpers/database-mongodb").getDB;
const mongodb = require('mongodb');
const Cart = require('../models/CartModel');


exports.getCart = (req, res, next) => {
    const userId = 1;
    var totalPrice = 0;
    // const price = element.TCI_Quantity * element.TP_Product_Price;
    

    res.render('cart.ejs', { pageTitle: "Cart", cartItems: rows, totalPrice: totalPrice});
       
    
};

exports.addToCart = (req, res, next) => {
    const prodId = req.body.productId;
    const userId = 1;
    var quantity = 1;
    const db = getDB();
    db.collection('doc_cart').find({ TCI_ProductId : new mongodb.ObjectId(prodId), TCI_Created_By:new mongodb.ObjectId(userId)  }).next()
        .then(cartItems => {
            if(cartItem) {
                console.log(cartItem._id)
                quantity+=1;
                const updateCartItems = new Cart(null, quantity, prodId, TCI_Created_By);

                updateCartItems.addToCart()
                    .then(() => {
                        res.redirect('/shop/cart');
                    })
                    .catch(err => {
                        console.log("Inside CartController, addToCart , updateCart");
                        console.log(err);  
                    });
            } else {
                const insertCartItems = new Cart(null, quantity, prodId, TCI_Created_By);
                
                insertCartItems.addToCart()
                    .then(() => {
                        res.redirect('/shop/cart');
                    })
                    .catch(err => {
                        console.log("Inside CartController, addToCart , updateCart");
                        console.log(err);  
                    });
            }
        })
        .catch(err => {
            console.log("Inside CartController, addToCart");
            console.log(err);      
        })
    //const cart = new Cart(null,quantity,prodId, userId);
    //console.log("Inside CartController.js-- Add to Cart Post request --> Product Id = " + prodId);
    
    
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