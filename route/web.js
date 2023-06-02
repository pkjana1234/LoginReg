const express = require('express');
const Route = express();

const bodyParser = require('body-parser')

//use body parser for get data from form body
Route.use(bodyParser.json());
Route.use(bodyParser.urlencoded({ extended: true }));

const StudentController = require('../controller/StudentController');

Route.post('/student', StudentController.store);
Route.get('/allstudent', StudentController.allstudent);
Route.get('/edit/:id', StudentController.edit);
Route.post('/update/:id', StudentController.update);
Route.delete('/delete/:id', StudentController.destroy);




module.exports = Route;