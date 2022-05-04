exports.getOrders = (req, res, next) => {
    res.render('orders.ejs', {path:'/orders',pageTitle:"Orders"});
}