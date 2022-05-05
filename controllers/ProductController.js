const Product = require('../models/ProductModel');


exports.getAddProduct = (req, res, next) => {
    // res.sendFile('/views/add-product.html'); //This will mean that th efile will be searched in the Windos directory C:// ....
    // res.sendFile(path.join(__dirname, '..' , 'views', 'add-product.html')); //No "/" to be used, as we use "join"
    //res.sendFile(path.join(rootDir , 'views', '/admin/add-product.html'));
    res.render('add-product.ejs',{pageTitle: "Add Product"});

}

exports.addProduct = (req, res, next) => {
    //pdt.push({title:req.body.title});
    const productId = (req.body.productId != '') ? req.body.productId : '';
    const title = req.body.title;
    const description = req.body.desc;
    const price = req.body.price;
    //const imgURL = req.body.img_url;
    const imgURL = '';
    console.log("Inside ProductController " + title + description + price + imgURL);
    const product = new Product(title,description,imgURL,price);
    product.save();
    //console.log(product);
    res.redirect('/admin/product-list');
}


// exports.listAllProducts = (req, res, next) => {
//     // res.sendFile(path.join(__dirname, '../' ,'views', 'shop.html')); //This is ALSO correct
//     //res.sendFile(path.join(__dirname, '..' ,'views', 'shop.html'));

//     //const products = Product.fetchAll() ;
//     //console.log(products);
//     // products = [ {title:'Pdt1', desc: 'Book 1' },
//     //             {title:'Pdt2', desc: 'Book 2' },
//     //             {title:'Pdt3', desc: 'Book 3' },
//     //             {title:'Pdt4', desc: 'Book 4' },

//     // ];

//     Product.fetchAll(products => {
//         res.render('product-list.ejs', {pdts: products});
//     });
    
    //res.render('list-product.ejs', {pdts: products});
// }


exports.getProductListAdmin = (req, res, next) => {
        Product.fetchAll(products => {
            res.render('admin/product.ejs', {pageTitle: "Admin Product List", pdts: products});
    });
    
};

exports.getEditProductAdmin = (req, res, next) => {
    const productId = req.params.id;
   
    Product.findById(productId, productDetail => {
        //console.log(product);
        res.render('edit-product.ejs', {pageTitle: "Edit Product", product: productDetail});
    });
    //console.log("Inside ShopController");
    
    //res.render('edit-product.ejs', {pageTitle: "Edit Product"});
}