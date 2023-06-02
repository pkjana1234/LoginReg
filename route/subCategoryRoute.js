const express = require('express');
const sub_category_route = express();

const bodyParser = require('body-parser')

//use body parser for get data from form body
sub_category_route.use(bodyParser.json());
sub_category_route.use(bodyParser.urlencoded({ extended: true }));

const auth = require('../middleware/auth');
const subcatagoryController = require('../controller/SubcategoryController');

sub_category_route.post('/add-sub-category', auth, subcatagoryController.add_sub_Category);


module.exports = sub_category_route