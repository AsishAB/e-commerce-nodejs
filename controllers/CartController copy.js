const mongodb = require('mongodb');
const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');
// console.log(Cart);

exports.getCart = (req, res, next) => {
    const userId = new mongodb.ObjectId("6289f95b782fc61f1491f279");
    var totalPrice = 0;
    const products = [];
    var shippingPrice = 200;
    

    Cart.find( {TCI_Created_By: userId })
        .then(cartItems => {
            const productIds = cartItems.map(id => {
                return id.TCI_ProductId
            });
            //console.log(productIds)
            Product.find( {_id: {$in: productIds}} )
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
                    let cartList = [];
                    for( let i=0; i < cartData.length; i++) {
                        cartList[i] = cartData[i]._doc;
                        cartList[i].cartId = cartData[i].cartId;
                        cartList[i].quantity = cartData[i].quantity;
                    }
                    //console.log("Inside CartController, cartItems, productItems");
                    //console.log(cartList);

                    cartList.forEach(element => {
                        totalPrice+=element.quantity * element.TP_Product_Price;   
                    });
                    res.render('cart.ejs', { pageTitle: "Cart", cartItems: cartList, totalPrice: totalPrice});
                })
                
               
            
            // cartObject.cartItems = cartItems;
            // return cartObject
        })
        // .then(cartData => {
        //     console.log("Inside CartController, cartItems, productItems");
        //     console.log(cartData);
        //     //res.render('cart.ejs', { pageTitle: "Cart", cartItems: cartData.cartItems, totalPrice: cartData.totalPrice});
        //     res.render('cart.ejs', { pageTitle: "Cart", cartItems: cartData.cartItems, totalPrice: cartData.totalPrice});
        // })
        .catch(err => {
            console.log("Inside CartController, cartItems, productItems");
            console.log(err);
        });
    
};
    
       
    

exports.addToCart = (req, res, next) => {
    const prodId = new mongodb.ObjectId(req.body.productId);
    const userId = new mongodb.ObjectId("6289f95b782fc61f1491f279");
    var quantity = 1;
    // const db = getDB();

    //Cart.find({ TCI_ProductId:prodId  })
    // console.log(Cart);

    Cart.findOne({ TCI_ProductId : prodId, TCI_Created_By:userId  })
        .then(cartItem => {
            if(cartItem && cartItem.length != 0) {
                // console.log("Inside CartController, addToCart , updateCart");
                // console.log(cartItem);
                quantity+=cartItem.TCI_Quantity;
               
                cartItem.TCI_Quantity = quantity;

                cartItem.save()
                    .then(() => {
                        //res.redirect('/shop/cart');
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
                        //res.redirect('/shop/cart');
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
    

   