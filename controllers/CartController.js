const mongodb = require('mongodb');
const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');
const getUserId = require('../helpers/getUserId');
const Crypt = require('../helpers/encrypt_decrypt/encryptDecryptText');
const globalURL = require('../helpers/secret-files-gitallow/global-url');

exports.getCart = (req, res, next) => {
    const userId =req.user._id;
    var totalPrice = 0;
    const products = [];
    var shippingPrice = 200;
    

    Cart.find( {TCI_Created_By: userId })
        .populate('TCI_ProductId')
        //.execPopulate()
        .then(cartItems => {
             //console.log("Inside CartController, cartItems, productItems");
            //console.log(cartItems);
           
            
            cartItems.forEach(element => {
               // console.log(element);
               element.TCI_ProductId.TP_Image_URL = globalURL + element.TCI_ProductId.TP_Image_URL;
                totalPrice+=element.TCI_Quantity * element.TCI_ProductId.TP_Product_Price;   
            });
            res.render('cart.ejs', { pageTitle: "Cart", cartItems: cartItems, totalPrice: totalPrice });
        })
    
        .catch(err => {
            //console.log("Inside CartController, cartItems, productItems");
            console.log(err);
        });
    
};
    
       
    

exports.addToCart = (req, res, next) => {
    const prodId = (req.body.productId) ? Crypt.decrypt(req.body.productId, "private.pem") : '';
    
    //const prodId = req.body.productId;
    const userId = req.user._id;
    var quantity = 1;
  

    Cart.findOne({ TCI_ProductId : prodId, TCI_Created_By:userId  })
        .then(cartItem => {
            if(cartItem && cartItem.length != 0) {
                // console.log("Inside CartController, addToCart , updateCart");
                // console.log(cartItem);
                quantity+=cartItem.TCI_Quantity;
               
                cartItem.TCI_Quantity = quantity;

                cartItem.save()
                    .then(() => {
                        res.redirect('/shop/cart');
                    })
                    .catch(err => {
                        console.log("Inside CartController, addToCart , updateCart");
                        console.log(err);  
                    });
            } else {
                //console.log("Inside CartController, addToCart , insertCart");
                const insertCartItems = new Cart({TCI_CartId: null, TCI_Quantity:quantity, TCI_ProductId:prodId, TCI_Created_By:userId});
                
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
    Cart.findByIdAndRemove(cartId)
    .then(() => {
        res.redirect('/shop/cart');
    })
    
    .catch(err => {
        console.log("Inside CartController, removeItemsFromCart");
        console.log(err)
    });
};
    

   