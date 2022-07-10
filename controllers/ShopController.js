const Product = require('../models/ProductModel');
const Crypt = require('../helpers/encrypt_decrypt/encryptDecryptText');
const globalURL = require('../helpers/secret-files-gitallow/global-url');

//const products = new Products();
exports.getShopIndexPage = (req, res, next) => {
    res.render('shop/index.ejs', { pageTitle: "Welcome" });
}


exports.getAllProducts = (req, res, next) => {
    
    Product.find()
    .then(products => { 
        products.forEach(element => {

            element.TP_ProductId = Crypt.encrypt(element._id, "public.pem");
            element.TP_Product_Description = element.TP_Product_Description.substring(0,100) + "......";
            element.TP_Image_URL = globalURL + element.TP_Image_URL;
        });
            res.render('product-list.ejs', { pageTitle:"Product List" ,pdts: products });
        })
        .catch(err => {
            console.log("Inside ShopController.js");
            console.log(err);
        });
}


exports.getProductDetail = (req, res, next) => {
    const productId = (req.params.id) ? Crypt.decrypt(req.params.id, "private.pem") : '';
    
    Product.findById(productId)
        .then(productDetail => {
            productDetail.TP_Image_URL = globalURL + productDetail.TP_Image_URL;
            res.render('product-detail.ejs', {pageTitle: "Product Detail", product: productDetail});
        })
        .catch(err => {
            console.log(err);
        });
       
    
    //res.render('product-detail.ejs', {pageTitle: "Product Detail"});
}





/* 


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
        products.forEach(element => {
            element.description = element.description.substring(0,100) + "......";
        });
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

*/
