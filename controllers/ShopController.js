const Product = require('../models/ProductModel');

//const products = new Products();
exports.getShopIndexPage = (req, res, next) => {
    res.render('shop/index.ejs', {pageTitle: "Welcome"});
}

exports.getAllProducts = (req, res, next) => {
    // res.sendFile(path.join(__dirname, '../' ,'views', 'shop.html')); //This is ALSO correct
    //res.sendFile(path.join(__dirname, '..' ,'views', 'shop.html'));

    //const products = Product.fetchAll() ;
    //console.log(products);
    // products = [ {title:'Pdt1', desc: 'Book 1' },
    //             {title:'Pdt2', desc: 'Book 2' },
    //             {title:'Pdt3', desc: 'Book 3' },
    //             {title:'Pdt4', desc: 'Book 4' },

    // ];

    Product.fetchAll(products => {
        res.render('product-list.ejs', {pageTitle:"Product List" ,pdts: products});
    });
    
    //res.render('list-product.ejs', {pdts: products});
}


exports.getProductDetail = (req, res, next) => {
    const productId = req.params.id;
   
    Product.findById(productId, productDetail => {
        //console.log(product);
        res.render('product-detail.ejs', {pageTitle: "Product Detail", product: productDetail});
    });
    //res.render('product-detail.ejs', {pageTitle: "Product Detail"});
}

