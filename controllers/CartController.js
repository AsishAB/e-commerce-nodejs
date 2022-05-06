exports.getCart = (req, res, next) => {
    res.render('cart.ejs',{pageTitle: "Cart"});
};

exports.addToCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log("Inside Cart-- Add to Cart Post request --> Product Id = " + prodId);
    res.redirect('/shop/cart');
};