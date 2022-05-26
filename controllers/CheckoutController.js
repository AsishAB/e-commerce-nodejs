const getDB = require("../helpers/database-mongodb").getDB;
const mongodb = require('mongodb');

exports.getCheckout = (req, res, next) => {
    const userId = new mongodb.ObjectId("6289f95b782fc61f1491f279");
    var totalPrice = 0;
    var shippingPrice = 200;
    const products = [];
    var couponCode = null;
    const db = getDB();
    var cartObject = {};
    
    db.collection('doc_cart').find( {TCI_Created_By: userId } ).toArray()
        .then(cartItems => {
            if (cartItems.length == 0) {
                console.log(cartItems);
                console.log("Inside CheckoutController.js -> getCheckout");
                console.log('No Cart Found');
                res.redirect('/shop/products');
            }
            const productIds = cartItems.map(id => {
                return id.TCI_ProductId
            });
            //console.log(productIds)
            db.collection('doc_products').find( {_id: {$in: productIds}} ).toArray()
            .then(products => {
                    return products.map(p => {
                        return {
                            ...p ,
                            
                            cartId: cartItems.find(ct =>  {
                            return ct.TCI_ProductId.toString() === p._id.toString();
                        })._id,

                            quantity: cartItems.find(ct =>  {
                            //console.log(ct.TCI_ProductId.toString() + "------" +  p._id.toString())
                                return ct.TCI_ProductId.toString() === p._id.toString();
                            }).TCI_Quantity
                        }
                    })
                    //cartObject.products = products;


                   // return products;
                })
                .then(cartData => {
                    // console.log("Inside CheckoutController, productItems");
                    // console.log(cartData);

                    cartData.forEach(element => {
                        totalPrice+=element.quantity * element.TP_Product_Price;   
                    });
                    res.render('checkout.ejs', { pageTitle: "Checkout", cartItems: cartData, totalPrice: totalPrice});
                });
                
    
    
        });

};