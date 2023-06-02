const express = require('express');
const category_route = express();

const bodyParser = require('body-parser')

//use body parser for get data from form body
category_route.use(bodyParser.json());
category_route.use(bodyParser.urlencoded({ extended: true }));

const auth = require('../middleware/auth');
const catagoryController = require('../controller/categoryController')

category_route.post('/add-category', auth, catagoryController.add_Category);
category_route.get('/get_category', catagoryController.get_category);


module.exports = category_route