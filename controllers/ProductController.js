const Product = require('../models/ProductModel');


exports.getAddProduct = (req, res, next) => {
    
    const prodId = req.params.id;
    if (prodId == '' || prodId == undefined || prodId == null ) {

        res.render('add-product.ejs',{pageTitle: "Add Product",product: []});
    } else {
        Product.findById(prodId)
            .then( ([rows]) => {
                res.render('add-product.ejs', {pageTitle: "Edit Product", product: rows[0]});
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
        product = new Product(productId,title,description,imgURL,price);
    }
    
    product.save()
        .then(() => {
            //console.log(response);
            res.redirect('/admin/product-list');
        })
        .catch(err => {
            console.log("Inside Product Controller.js");
            console.log(err);
        });
    
    //console.log(product);
   // res.redirect('/admin/product-list');
}

exports.deleteProduct = (req, res, next) => {
    
    res.redirect('/admin/product-list');
};



exports.getProductListAdmin = (req, res, next) => {
    Product.fetchAll()
    .then(([rows, fieldData]) => { //fieldData is optional
        rows.forEach(element => {
            element.TP_Product_Description = element.TP_Product_Description.substring(0,100) + "......";
        });
        res.render('admin/product.ejs', {pageTitle: "Admin Product List", pdts: rows});
    })
    .catch(err => {
        console.log("Inside ProductController \n");
        console.log(err);
    });
};
           
    

exports.getEditProductAdmin = (req, res, next) => {
    const productId = req.params.id;
   
    Product.findById(productId)
        .then( ([rows]) => {
            res.render('edit-product.ejs', {pageTitle: "Edit Product", product: rows[0]});
        })  
        .catch(err => {
            console.log("Inside ProductController \n");
            console.log(err);
        }); 
        
   
    //console.log("Inside ShopController");
    
    //res.render('edit-product.ejs', {pageTitle: "Edit Product"});
}





