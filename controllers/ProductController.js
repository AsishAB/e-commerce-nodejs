exports.getAddProduct = (req, res, next) => {
    // res.sendFile('/views/add-product.html'); //This will mean that th efile will be searched in the Windos directory C:// ....
    // res.sendFile(path.join(__dirname, '..' , 'views', 'add-product.html')); //No "/" to be used, as we use "join"
    //res.sendFile(path.join(rootDir , 'views', '/admin/add-product.html'));
    res.render('add-product.ejs');

}

exports.addProduct = (req, res, next) => {
    pdt.push({title:req.body.title});
    console.log(pdt);
    res.redirect('/admin/list-product');
}

exports.listAllProducts = (req, res, next) => {
    // res.sendFile(path.join(__dirname, '../' ,'views', 'shop.html')); //This is ALSO correct
    //res.sendFile(path.join(__dirname, '..' ,'views', 'shop.html'));
    products = [ {title:'Pdt1', desc: 'Book 1' },
                {title:'Pdt2', desc: 'Book 2' },
                {title:'Pdt3', desc: 'Book 3' },
                {title:'Pdt4', desc: 'Book 4' },

    ];
    res.render('shop.ejs', {pdts: products});
}