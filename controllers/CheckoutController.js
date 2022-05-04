exports.getCheckout = (req, res, next) => {
    res.render('checkout.ejs',{pageTitle: "Checkout"});
}