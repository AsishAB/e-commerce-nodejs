exports.get404Page = (req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404-error.html'));
    //res.status(404).sendFile(path.join(rootDir, 'views', '/htmlerrors/404-error.html'));
    res.status(404).render('404-error.ejs', {pageTitle: "Page Not Found"});
};