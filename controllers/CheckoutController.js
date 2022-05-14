const db = require("../helpers/database-mysql");

exports.getCheckout = (req, res, next) => {
    const userId = 1;
    var totalPrice = 0;
    db.query("SELECT * FROM vw_cart_items WHERE TCI_CartItem_AddedBy = ? ", [userId])
        .then(([rows]) => {
            if(rows.length == 0) {
                console.log("Inside CheckoutController.js");
                console.log("Cart is Empty");
                res.redirect('/shop/products');
            } else {
                rows.forEach(element => {
                    const price = element.TCI_Quantity * element.TP_Product_Price;
                    totalPrice += price;
                });
                res.render('checkout.ejs', { pageTitle: "Checkout", cartItems: rows, totalPrice: totalPrice});
            }
            
           
        });
    
}