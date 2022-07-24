const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const { graphqlHTTP  } = require('express-graphql');
// console.log(graphqlHTTP );
// const postRoute = require('./routes/postRoute');
// const authRoute = require('./routes/authRoute');

const graphQLSchema = require('./graphql/schema');
const graphQLResolvers = require('./graphql/resolvers');



const mongoURL = require('./helpers/secret-data/mongodb-using-mongoose');

const port = process.env.PORT || 8090;

const bodyParser  = require('body-parser');
app.use('/post_images', express.static(path.join(__dirname, "public/post_images/")));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/graphql', graphqlHTTP  ({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true,
    customFormatErrorFn(err) {
        if (!err.originalError) {
            return err;
        }
        const errorData = err.originalError.data;
        const message = err.originalError.message || "An Error Occured";
        const errorStatusCode = err.originalError.statusCode || 500;
        return { message: message, errorData: errorData, errorStatusCode: errorStatusCode  }
    }
}));

/*
* Routes are not required while using GraphQL
*
*
 app.use('/feed', postRoute);
 app.use('/auth', authRoute);

 */
app.use((error, req, res, next) => {
    console.log(error);
    const statusCode = error.statusCode || 500;
    const message = error.message;
    res.status(statusCode).json({message: message, statusCode: statusCode}); 
});

mongoose.connect(mongoURL)
    .then(result => {
        console.log(`REST API app listening on port ${port} - http://localhost:${port}`);
        const server = app.listen(port);
        // const io = require('./socket').init(server, {
        //     cors: {
        //         origin: "http://localhost:3000",
        //         methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
        //     }
        // });
        // io.on('connection', socket => {
        //     console.log("In app.js");
        //     console.log("Client Connected");
        // })
    })
    .catch(err => {
         
         console.log(err);
    });




// app.listen(port, () => {
//     console.log(`REST API app listening on http://localhost:${port}`);
// })