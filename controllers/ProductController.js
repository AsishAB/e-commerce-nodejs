const Product = require('../models/ProductModel');
//const mongodb = require('mongodb');

exports.getAddProduct = (req, res, next) => {
    
    const prodId = req.params.id;
    if (prodId == '' || prodId == undefined || prodId == null ) {

        res.render('add-product.ejs',{ pageTitle: "Add Product",product: [] });
    } else {
        Product.findById(prodId)
            
            .then(product => {
                // console.log("Inside ProductController \n");
                // console.log(product);

                res.render('add-product.ejs', { pageTitle: "Edit Product", product: product });
            })  
            .catch(err => {
                console.log("Inside ProductController \n");
                console.log(err);
            }); 

        
    }

}

exports.addProduct = (req, res, next) => {
    //pdt.push({title:req.body.title});
    const productId = req.body.productId;
    const title = req.body.title;
    const description = req.body.desc;
    const price = req.body.price;
    //const imgURL = req.body.img_url;
    const imgURL = '';
    //console.log("Inside ProductController " + title + description + price + imgURL);
    let product;
    if (productId == '') {
        product = new Product(null,title,description,imgURL,price);
    } else {
        product = new Product(productId ,title,description,imgURL,price);
    }
    
    product.save()
        .then((response) => {
            // console.log("Inside Product Controller.js");
            // console.log(response);
            //res.redirect('/admin/product-list');
        })
        .catch(err => {
            console.log("Inside Product Controller.js");
            console.log(err);
        });
    
    //console.log(product);
   // res.redirect('/admin/product-list');
}

exports.deleteProduct = (req, res, next) => {
    const prodId  = req.body.productId;
    Product.deleteById(prodId)
    .then(() => {
        // console.log("Inside Product Controller.js");
        // console.log("Product Deleted");
        res.redirect('/admin/product-list');
    })
    .catch(err => {
        console.log("Inside Product Controller.js");
        console.log(err);
    });
    
};



exports.getProductListAdmin = (req, res, next) => {
    Product.fetchAll()
    .then(products => { 
        products.forEach(element => {
            element.TP_Product_Description = element.TP_Product_Description.substring(0,100) + "......";
        });
        res.render('admin/product.ejs', {pageTitle: "Admin Product List", pdts: products});
    })
    .catch(err => {
        console.log("Inside ProductController \n");
        console.log(err);
    });
};
           
    
