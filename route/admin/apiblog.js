const express=require('express');
const ApiRoute=express.Router();
const ApiBlogControlller=require('../../controller/apiblog')
const bodyParser = require('body-parser')

//use body parser for get data from form body
ApiRoute.use(bodyParser.json());
ApiRoute.use(bodyParser.urlencoded({ extended: true }));



ApiRoute.get('/allBlog',ApiBlogControlller.allBlog);
ApiRoute.get('/blogdetails/:id',ApiBlogControlller.blogdetail);
//view all category
ApiRoute.get('/showallcategory',ApiBlogControlller.showallcategory);
//view category wise post
ApiRoute.get('/category/:_id',ApiBlogControlller.category);


ApiRoute.get('/letest-post',ApiBlogControlller.latestPost);

//filter data 
ApiRoute.get('/search/:keyword',ApiBlogControlller.filetr);

module.exports=ApiRoute;