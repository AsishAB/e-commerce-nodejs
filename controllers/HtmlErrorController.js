exports.get404Page = (req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404-error.html'));
    //res.status(404).sendFile(path.join(rootDir, 'views', '/htmlerrors/404-error.html'));
    res.status(404).render('404-error.ejs', {pageTitle: "404-Page Not Found"});
};

exports.get500Page = (req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404-error.html'));
    //res.status(404).sendFile(path.join(rootDir, 'views', '/htmlerrors/404-error.html'));
    res.status(500).render('500-error.ejs', {pageTitle: "500-Server Error"});
};