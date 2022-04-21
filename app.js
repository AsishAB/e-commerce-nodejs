
const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

app.use('/go',  (req, res, next) => {
    res.send("<h1> Hello From Go </h1>")
});
app.use('/',  (req, res, next) => {
    res.send("<h1> Hello From Node </h1>");
   
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port} - http://localhost:${port}`)
});