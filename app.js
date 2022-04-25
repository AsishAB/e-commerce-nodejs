
const express = require("express");

const bodyParser = require('body-parser');
const app = express();

const adminRoutes = require("./routes/admin");

const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({extended:false}));


app.use(adminRoutes);
app.use(shopRoutes);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port} - http://localhost:${port}`)
});