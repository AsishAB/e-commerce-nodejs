const Product = require('../models/ProductModel');
const mongodb = require('mongodb');

// const getUserId = require('../helpers/getUserId');
const globalURL = require('../helpers/secret-files-gitallow/global-url');
const encryptDecryptText = require('../helpers/encrypt_decrypt/encryptDecryptText');

exports.getProductListAdmin = (req, res, next) => {
    //console.log(req.user);
    
    Product.find({TP_Created_By: req.user})
    .then(products => { 
        products.forEach(element => {
           
            //element._id = encryptDecryptText.encryptText(element._id); //Not working
            element.TP_ProductId = encryptDecryptText.encrypt(element._id, "public.pem");
                
            
            // return;
            element.TP_Product_Description = element.TP_Product_Description.substring(0,100) + "......";
            element.TP_Image_URL = globalURL + element.TP_Image_URL;
        });
        //console.log(products);
        res.render('admin/product.ejs', { pageTitle: "Admin Product List", pdts: products });
    })
    .catch(err => {
        console.log("Inside ProductController \n");
        console.log(err);
    });
};


exports.getAddProduct = (req, res, next) => {
    
    const prodId = encryptDecryptText.decrypt(req.params.id, "private.pem");
    // console.log(prodId);
    // return;
    if (prodId == '' || prodId == undefined || prodId == null ) {

        res.render('add-product.ejs',{ pageTitle: "Add Product",product: [] });
    } else {
        
        Product.findById(prodId)
            
            .then(product => {
                product.TP_Image_URL = globalURL + product.TP_Image_URL;
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
    const userId = req.user._id; //Available in app.js
    if (!userId) {
        req.flash("error", "Unauthorised");
        return res.redirect('/user/login');
    }
    const productId = req.body.productId;
    const title = req.body.title;
    const description = req.body.desc;
    const price = req.body.price;
    
    //console.log(userId);
    //return;
    const imgURL = req.file;

    let fileName = (imgURL) ? "product_images/" + imgURL.filename : '';
    
    //console.log("Inside ProductController " + title + description + price + imgURL);
    let product;
    if (productId == '') {
        product = new Product({TP_ProductId: null ,TP_Product_Title:title,TP_Product_Description:description,TP_Image_URL:fileName,TP_Product_Price:price,TP_Created_By:userId});
        product.save()
        .then(response => {
            res.redirect('/admin/product-list');
        })
        .catch(err => {
            
            console.log(err);
        });
    } else {
        
        // product = new Product({TP_ProductId: productId ,TP_Product_Title:title,TP_Product_Description:description,TP_Image_URL:imgURL,TP_Product_Price:price,TP_Created_By:null});
        Product.findById(productId)
            .then(productFromId => {
                if (productFromId.TP_Created_By.toString() != userId.toString()) {
                    console.log("Inside ProductController ->addProduct (edit product) ");
                    console.log("Unauthorised");
                    req.flash('error', "Unauthorised");
                    return res.redirect('/');
                }
                if ( !imgURL ) {
                    productFromId.TP_Product_Title=title;
                    productFromId.TP_Product_Description=description;
                    
                    productFromId.TP_Product_Price=price;
                    productFromId.TP_Updated_By=userId;
                   
                } else {
                    productFromId.TP_Product_Title=title;
                    productFromId.TP_Product_Description=description;
                    productFromId.TP_Image_URL=fileName;
                    productFromId.TP_Product_Price=price;
                    productFromId.TP_Updated_By=userId;
                    
                }
                productFromId.save()
                .then(response => {
                  
                    res.redirect('/admin/product-list');
                })
                .catch(err => {
                    
                    console.log(err);
                });
            });
    }
    
    
    
    //console.log(product);
   // res.redirect('/admin/product-list');
}

exports.deleteProduct = (req, res, next) => {
    const prodId  = req.body.productId;
    Product.findById(prodId)
        .then(productFromId => {
            if (productFromId.TP_Created_By.toString() != userId.toString()) {
                console.log("Inside ProductController ->addProduct (edit product) ");
                console.log("Unauthorised");
                req.flash('error', "Unauthorised");
                return res.redirect('/');
            }
        });
    
    Product.findByIdAndRemove(prodId)
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


           
    
