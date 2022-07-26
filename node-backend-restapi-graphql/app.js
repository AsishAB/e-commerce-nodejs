const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const { graphqlHTTP  } = require('express-graphql');
const bodyParser  = require('body-parser');

const graphQLSchema = require('./graphql/schema');
const graphQLResolvers = require('./graphql/resolvers');

const mongoURL = require('./helpers/secret-data/mongodb-using-mongoose');
const AuthMiddleware = require('./middlewares/AuthMiddleware');
const MulterMiddleware = require('./middlewares/MulterMiddleware');
const Helper = require('./helpers/helper_functions/helper');


const port = process.env.PORT || 8090;



app.use(bodyParser.json());
app.use('/post_images', express.static(path.join(__dirname, "public/post_images/")));
// app.use(express.json({limit: '500mb'}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    /* Required for Graph QL */
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
    


app.use(AuthMiddleware);

app.post('/upload-image', MulterMiddleware('posts'), (req, res, next) => {
    let error;
    
    if (!req.isAuth) {
        error = new Error("Inside app.js -> upload-image === Unauthenticated");
        error.statusCode = 401;
        throw error;
    }
    if (!req.file) {
        return res.status(200).json({message: "No File selected for upload",fileName: ''});
    }
    // if (req.body.oldPath) {
    //     Helper.deleteFile(req.body.oldPath);
    // }
    const imageURL = req.file;
    let fileName = (imageURL) ? "post_images/" + imageURL.filename : '';
    return res.status(201).json( {response:'success',message: "File Stored", fileName: fileName} );
})

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