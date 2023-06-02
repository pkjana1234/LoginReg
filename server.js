const express =  require('express')
const mongoose =  require('mongoose')
const dotenv =require('dotenv') 
const cors=require('cors')
const body_parser = require('body-parser')
const ejs=require('ejs');
const path = require('path');
const flash=require('connect-flash');
const session =require('express-session');
const connectDB= require('./config/db');
dotenv.config()
const app = express()
connectDB();


app.use(session({
    secret:'secrect',
    cookie:{maxAge:600000},
    resave:false,
    saveUninitialized:false
}));
app.use(flash());




app.set('view engine','ejs');
app.set('viwes','views');
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(cors());



const userRoute=require('./route/userRoute');
app.use('/api',userRoute);

//store route
const StoreRoute=require('./route/storeRoute');
app.use('/api',StoreRoute);

//category route
const CategoryRoute=require('./route/categoryRoute');
app.use('/api',CategoryRoute);
//subcategory
const Subcategory=require('./route/subCategoryRoute');
app.use('/api',Subcategory);
//product route
const ProductRoute=require('./route/productRoute');
app.use('/api',ProductRoute);

//Student
const StudentRoute=require('./route/web');
app.use('/api',StudentRoute);

//feedback
const FeedbackRoute=require('./route/feedbackRoute');
app.use(FeedbackRoute);
//Blog api
const ApiRoute=require('./route/admin/apiblog');
app.use('/api',ApiRoute);

//admin Route
const AdminRoute=require('./route/admin/HomeRoute');
app.use('/admin',AdminRoute);

//aggrigration route
const AggrigrationRoute=require('./route/aggrigration/AggrigrateRoute');
app.use('/api',AggrigrationRoute);
 //connect mongodb

 const port=process.env.PORT || 2000

 app.listen(port,()=>{
     console.log(`server running on port: http://localhost:${port}`);
 })

  // https://backendapinodejsraju.herokuapp.com/api/register


  
  