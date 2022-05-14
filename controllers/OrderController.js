const db = require('../helpers/database-mysql');

exports.getOrders = (req, res, next) => {
    res.render('orders.ejs', { path:'/orders',pageTitle:"Orders" });
}

exports.placeOrder = (req, res, next) => {
    const userId = 1;
    var totalPrice = 0;
    var shippingPrice = 200;
    var couponCode = null;
    var totalOrders = 0;
    var dateTime = new Date().getFullYear() + ( new Date().getMonth() + 1 ) +  new Date().getDate() +  new Date().getHours() +  new Date().getMinutes() +  new Date().getSeconds();
    var orderId = "ECNJS-";
    orderId+=dateTime + "-00";
    db.query("SELECT * FROM tbl_orders")
        .then(([rows]) => {
            totalOrders = rows.length + 1;
        });

    orderId+=totalOrders;
    db.query("SELECT * FROM vw_cart_items WHERE TCI_CartItem_AddedBy = ? ", [userId])
        .then(([rows]) => {
            rows.forEach(element => {
                const price = element.TCI_Quantity * element.TP_Product_Price;
                totalPrice += Number(price);
                
                });
            rows.totalPrice = totalPrice;
            return rows;
        })
        .then(result => {
            //console.log("Inside OrderController.js");
            //console.log(result.totalPrice);
            var query1 = "INSERT INTO tbl_orders (TO_Order_Id, TO_User_Id, TO_Net_Price, TO_Shipping_Cost, TO_Total_Price, TO_Coupon_Code) VALUES (?, ? , ?, ?, ? , ?) ";
            var arrayParams1 = [orderId, userId, result.totalPrice, shippingPrice, result.totalPrice + shippingPrice, couponCode];
            db.query(query1, arrayParams1)
            .then(() => {
                var query2 = "INSERT INTO tbl_order_items (TOI_Order_Id, TOI_Product_Id, TOI_Quantity) SELECT ? ,TCI_Quantity,TCI_ProductId FROM vw_cart_items WHERE TCI_CartItem_AddedBy = ?";
                var arrayParams2 = [orderId, userId];
                db.query(query2, arrayParams2)
                    .then(() => {
                        res.redirect('/shop/order-confirmation?orderId=' + orderId);
                        // console.log("Inside Inside OrderController.js");
                        // console.log("Order Created Successfully");
                    })
                    .catch(err => {
                        console.log("Inside Inside OrderController.js");
                        console.log(err);  
                    });
            })
            .catch(err => {
                console.log("Inside OrderController.js");
                console.log(err);  
            });
    
        });
    

    
};
    
    
    
    

exports.getOrderConfirmation = (req, res, next) => {
    const orderId = req.query.orderId;
    var totalPrice = 0;
    var shippingPrice = 200;
    
    
    db.query("SELECT * FROM vw_order_details WHERE TO_Order_Id = ?", [orderId])
        .then(([result]) => {
            result.forEach(element => {
                
                const price = element.TCI_Quantity * element.TP_Product_Price;
                totalPrice += price;
            });

               
            const paymentDetails = {
                orderId:orderId,
                totalPrice:totalPrice,
                shippingPrice:shippingPrice,
                grandTotal:totalPrice + shippingPrice
            }
            res.render('order-confirmation.ejs', { pageTitle: "Order Confirmation", orderDetails : result,paymentDetails:paymentDetails });
        })
        .catch(err => {
            console.log("Inside OrderController.js -> getOrderConfirmation");
            console.log(err);
        });

    
}