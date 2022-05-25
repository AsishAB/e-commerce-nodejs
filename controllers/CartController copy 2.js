const getDB = require("../helpers/database-mongodb").getDB;
const mongodb = require('mongodb');
const Cart = require('../models/CartModel');


exports.getCart = (req, res, next) => {
    const userId = new mongodb.ObjectId("6289f95b782fc61f1491f279");
    var totalPrice = 0;
    const db = getDB();

    db.collection('doc_cart').find( {TCI_Created_By:userId } ).toArray()
        .then(cartItems => {
            for (let i = 0; i < cartItems.length; i++) {
                db.collection('doc_products').find({_id: new mongodb.ObjectId(cartItems[i].TCI_ProductId) }).next()
                .then(product  => {
                   totalPrice+=product.TP_Product_Price * cartItems[i].TCI_Quantity;
                });
            }
            const cartData = {
                cartItems: cartItems, 
                totalPrice: totalPrice
            }
            return cartData
        }) 
        .then(cartData => {
            // console.log("Inside CartController, cartItems, productItems");
            // console.log(cartData);
            res.render('cart.ejs', { pageTitle: "Cart", cartItems: cartData.cartItems, totalPrice: cartData.totalPrice});
        })
        .catch(err => {
            console.log("Inside CartController, cartItems, productItems");
            console.log(err);
        });
    
};
    
       
    

exports.addToCart = (req, res, next) => {
    const prodId = new mongodb.ObjectId(req.body.productId);
    const userId = new mongodb.ObjectId("6289f95b782fc61f1491f279");
    var quantity = 1;
    const db = getDB();
    db.collection('doc_cart').find({ TCI_ProductId : prodId, TCI_Created_By:userId  }).next()
        .then(cartItem => {
            return cartItem;
        })
            
        .then(cartItem => {

            if(cartItem) {
                //console.log("Inside CartController, addToCart , updateCart");
                console.log(cartItem.TCI_Quantity);
                quantity+=cartItem.TCI_Quantity;
                const updateCartItems = new Cart(cartItem._id, quantity, prodId, userId);

                updateCartItems.save()
                    .then(() => {
                        res.redirect('/shop/cart');
                    })
                    .catch(err => {
                        console.log("Inside CartController, addToCart , updateCart");
                        console.log(err);  
                    });
            } else {
                //console.log("Inside CartController, addToCart , insertCart");
                const insertCartItems = new Cart(null, quantity, prodId, userId);
                
                insertCartItems.save()
                    .then(() => {
                        res.redirect('/shop/cart');
                    })
                    .catch(err => {
                        console.log("Inside CartController, addToCart , insertCart");
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
    Cart.deleteById(cartId)
    .then(() => {
        res.redirect('/shop/cart');
    })
    
    .catch(err => {
        console.log("Inside CartController, removeItemsFromCart");
        console.log(err)
    });
};
    

   