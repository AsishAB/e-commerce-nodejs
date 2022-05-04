exports.getCart = (req, res, next) => {
    res.render('cart.ejs',{pageTitle: "Cart"});
};