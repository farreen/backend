// Import essential libraries 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const router = express.Router();
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// DATA CONNECTIONS
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/taskmanagement", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const port = process.env.port || 3000

// IMPORTING ROUTES
const accessRoutes = require('./src/routes/accessRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

// BASE URL
const baseUrl = process.env.baseUrl;
app.use(baseUrl, accessRoutes)
app.use(baseUrl, taskRoutes)

//============ WELCOME TO HOME  ===============
app.use("/home", (req, res) => {
    res.end("<h1 style='text-align:center;color:white;background-color:black'>welcome to task management server </h1>")
})

// SERVER STARTING 
app.listen(port, () => {
    console.log(" SERVER IS RUNNING ON PORT : " + port);
})