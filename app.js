
//Open the newly created file named app.js and require all the dependencies we 
//previously installed (ExpressJS and body-parser )

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');    // Cross-Origin Resource Sharing (CORS) is a mechanism that 
                                 //uses additional HTTP headers to tell browsers to give a web application running at one origin, 
                                   //access to selected resources from a different origin
const path=require("path");
require('dotenv').config()

//initialise the app.js
const app = express();

/*
//import the db here
const db = require('./config/db').database;
*/

//Database Connection
mongoose.connect(process.env.ToDo_api_app, {
    useNewUrlParser: true,
   useUnifiedTopology:true
   // useFindAndModify:false 
})
.then(()=> {
console.log('Database connected successfully')
})
.catch((err)=>{
    console.log('Unable to connect with the database',err)
});

//Defining the port

//due to availability of n number of ports like AWS/Git which we are unsure of
//so this process happens automatically
const port = process.env.PORT || 5000;

//Initialise cors middleware
app.use(cors());

//Initialise BodyParser middleware
//Middleware functions are functions that have access to the request object (req), 
//the response object (res), and the next middleware function in the application's request-response cycle. These functions 
//used to modify req and res objects for tasks like parsing request bodies, adding response headers, etc.
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('<h1>Hello World</h1>');
}); 

const postRoutes= require('./routes/apis/post');
app.use('/apis/posts',postRoutes);

app.listen(port,()=>{
    console.log('server started on port',port);
});