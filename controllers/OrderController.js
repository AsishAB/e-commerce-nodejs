
const mongodb = require('mongodb');
const Order  = require('../models/OrderModel');
const OrderItems  = require('../models/OrderItemsModel');
const Cart = require('../models/CartModel');
const getUserId = require('../helpers/getUserId');
const Crypt = require('../helpers/encrypt_decrypt/encryptDecryptText');
const globalURL = require('../helpers/secret-files-gitallow/global-url');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const sendGridAPIKey = require('../helpers/secret-data/sendgrid_api');
const sendEMail = require('../helpers/secret-data/personal-email');

const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key : sendGridAPIKey
    }
}));
        


exports.getOrders = (req, res, next) => {
    
    const userId = req.user._id;
    Order.find( {TO_User_Id: userId} )
        .then(orders => {
            const orderIds = orders.map(ord => {
                return ord.TO_Order_Id
            });
            
            OrderItems.find( {TOI_Order_Id: { $in: orderIds } })
                .then(orderItems =>  {
                    const Order = {
                        orders : orders,
                        orderItems : orderItems
                    }
                    //console.log(Order);
                    res.render('orders.ejs', { path:'/orders',pageTitle:"Orders" , OrderList : Order});
                })
                .catch(err => {
                   
                    console.log(err);
                });
        })
        .catch(err => {
           
            console.log(err);
        });
    //res.render('orders.ejs', { path:'/orders',pageTitle:"Orders" });
}

exports.placeOrder = (req, res, next) => {
    
    const userId = req.user._id;
    
    var totalPrice = 0;
    var OrderItemObject = [];
    var shippingPrice = 200;
    var couponCode = null;
    var totalOrders = 0;
    var dateTime = new Date().getFullYear() + ( new Date().getMonth() + 1 ) +  new Date().getDate() +  new Date().getHours() +  new Date().getMinutes() +  new Date().getSeconds();
    var orderId = "ECNJS-";
    orderId+=dateTime + "-00";
    Order.find()
        .then(orders => {
            totalOrders = orders.length + 1;
        })
        .catch(err => {
            console.log("Inside OrderController.js");
            console.log(err);
        })

    orderId+=totalOrders;

    Cart.find( {TCI_Created_By: userId } )
        .populate('TCI_ProductId')
        .populate('TCI_Created_By')
        .then(cartData => {
            if (cartData.length == 0) {
                console.log(cartData);
                console.log("Inside OrderController.js -> placeOrder");
                console.log('Cart is Empty');
                res.redirect('/shop/products');
            } else {    
                const cartIds = cartData.map(c => {
                    return c._id;
                });
                // console.log(cartIds);
                // return;
                        cartData.forEach(element => {
                        var order = {
                            TOI_Order_Id:orderId, 
                            TOI_Product_Id: element.TCI_ProductId._id,
                            TOI_Product_Price: element.TCI_ProductId.TP_Product_Price, 
                            TOI_Quantity:element.TCI_Quantity , 
                            TOI_Created_On: new Date()  
                        }
                        // var createOrderItems = new OrderItems(order);
                        // createOrderItems.save();
                        OrderItemObject.push(order);

                        totalPrice+=element.TCI_Quantity * element.TCI_ProductId.TP_Product_Price;   
                    });
                    
                    var OrderObject = {
                        TO_Order_Id: orderId,
                        TO_User_Id: userId,
                        TO_Net_Price: totalPrice,
                        TO_Shipping_Cost: shippingPrice,
                        TO_Total_Price: Number(totalPrice + shippingPrice),
                        TO_Coupon_Code: couponCode,
                        TO_Created_On: new Date()
                    };
                   
                    const createOrder = new Order(OrderObject);
                   
                    createOrder.save()
                        .then(() => {
                            OrderItems.insertMany(OrderItemObject)
                                .then(() => {
                                    Cart.deleteMany( {_id: {$in: cartIds }} )
                                        .then(() => {
                                            res.redirect('/shop/order-confirmation?orderId=' + orderId);

                                        })
                                        .catch(err => {
                                            console.log(err);
                                        });
                                    
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                    })
                    .catch(err => {
                        console.log(err);
                    });

                   
                    
                }
        });
                
       
       
};

    
   

exports.getOrderConfirmation = (req, res, next) => {
    const orderId = req.query.orderId;
    const userId = req.user._id;
    if (!orderId) {
        console.log("Inside OrderController.js -> getOrderConfirmation");
        console.log('No Order');
        res.redirect('/shop/products');
    }
    var totalPrice = 0;
    var shippingPrice = 200;
    
    // db.collection('doc_cart').deleteMany( {TCI_Created_By: userId } );
    Order.findOne( { TO_Order_Id: orderId } )
        .populate('TO_User_Id')
        .then(orderDetail => {
            // console.log(orderDetail.TO_User_Id);
            // return;
            if (orderDetail.TO_User_Id._id.toString() != userId.toString()) {
                console.log("Inside OrderController.js -> getOrderConfirmation");
                console.log('USer Id does not match');
                res.redirect('/shop/products');
            }
            OrderItems.find( { TOI_Order_Id: orderId } )
                .populate('TOI_Product_Id')
                .then(result => {
                    //console.log(result);
                    //return;
                    result.forEach(element => {
                        element.TOI_Product_Id.TP_Image_URL = globalURL + element.TOI_Product_Id.TP_Image_URL
                        
                        totalPrice+=element.TOI_Product_Price * element.TOI_Quantity;
                        
                    });
                            const orderObject = {
                                orderDetails: orderDetail,
                                orderItemDetails: result,
                                totalPrice: totalPrice,
                                shippingPrice: shippingPrice,
                                grandTotal: totalPrice + shippingPrice
                            }  
                            transporter.sendMail({
                                to: sendEMail.sendTo,
                                from: "asish24in@gmail.com",
                                subject: "Order Placed Succesfully",
                                html: "<h1> Order Id: "+ orderId +"  </h1>"
                            });
                            res.render('order-confirmation.ejs', { pageTitle: "Order Confirmation", order : orderObject });
                        })
                        .catch(err => {
                            console.log("Inside OrderController.js ->  getOrderConfirmation -> order_items");
                            console.log(err);
                        });
                   
                           
                })
               
       
    
};