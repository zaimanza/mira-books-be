const http = require('http')

const express = require("express");
var cors = require('cors')
const app = express()
const bodyParser = require("body-parser");
const { connectDB } = require('./database/mongodb.database');

connectDB()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next()
// })

// Routes which should handle requests
app.use("/", require('./controllers'))

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

const port = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(port);
console.log(`🚀 Server ready at http://localhost:${port}`);