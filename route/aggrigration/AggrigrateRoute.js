const exptess=require('express');
const AggrigrateRoute=exptess.Router();

const AggrigrationController=require('../../controller/aggrigrate/AggrigrateController');

//for $lookup route
AggrigrateRoute.post('/add-address',AggrigrationController.add_address);
AggrigrateRoute.post('/add-employee',AggrigrationController.add_employee);
AggrigrateRoute.get('/gett',AggrigrationController.getAllData);

//for $match route
AggrigrateRoute.post('/add-article',AggrigrationController.addarticle);
AggrigrateRoute.get('/get-article',AggrigrationController.getarticle);



module.exports=AggrigrateRoute