
const express = require("express");

const bodyParser = require('body-parser');
const app = express();

const adminRoutes = require("./routes/admin");

const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({extended:false}));


app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send("<h1>404 Error </h1><p style='color:red;'>Page Not Found</p>")
})
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port} - http://localhost:${port}`)
});