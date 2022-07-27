// const express = require('express');
// import express from 'express';

import express = require('express');
import bodyParser = require('body-parser');

import todoRoutes from './routes/todosRoute';


const app = express();
const port = process.env.PORT || 3022;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});



app.use('/todos', todoRoutes);


app.listen(port, () => {
    
    console.log(`NodeJS with TypeScript listening on http://localhost:${port}`);
})

// app.listen({ port: port });