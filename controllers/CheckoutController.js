const Cart = require('../models/CartModel');
const mongodb = require('mongodb');
const getUserId = require('../helpers/getUserId');

exports.getCheckout = (req, res, next) => {
    const userId = new mongodb.ObjectId(getUserId);
    var totalPrice = 0;
    var shippingPrice = 200;
    var couponCode = null;

    
    
    Cart.find( {TCI_Created_By: userId } )

       .populate('TCI_ProductId')
        //.execPopulate()
        .then(cartItems => {
             //console.log("Inside CheckoutController, getCheckout");
            //console.log(cartItems);
           
            
                cartItems.forEach(element => {
                    totalPrice+=element.TCI_Quantity * element.TCI_ProductId.TP_Product_Price;   
                });
                
                res.render('checkout.ejs', { pageTitle: "Checkout", cartItems: cartItems, totalPrice: totalPrice});

            })
            .catch(err => {
                console.log("Inside CheckoutController, getCheckout");
                console.log(err);
            });
                
  

};